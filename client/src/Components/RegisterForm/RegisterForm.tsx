import React, {Dispatch, SetStateAction, useState} from 'react';

import Register from "./Register";
import Login from "./Login";
import './registerForm.sass'
import logo from "../../images/shop-logo.svg";

interface RegisterFormI {
    haveForm: boolean;
    setHaveForm: Dispatch<SetStateAction<boolean>>
}

const RegisterForm = ({haveForm, setHaveForm}: RegisterFormI) => {
    const [switchState, setSwitchState] = useState<boolean>(true)

    if(haveForm) {
        return (
            <div className={'register-form'} onClick={() => setHaveForm(false)}>
                <div className={'register-form__wrapper'} onClick={e => e.stopPropagation()}>
                    <div className={'register-form__logo'}>
                        <img src={logo} alt={'logo'} />
                    </div>
                    <div className={'register-form__switch'}>
                        <span className={`${!switchState ? 'switch-active' : ''}`} onClick={() => setSwitchState(!switchState)}>Регистрация</span>
                        <span className={`${switchState ? 'switch-active' : ''}`} onClick={() => setSwitchState(!switchState)}>Вход</span>
                    </div>
                    <Register isHide={switchState}/>
                    <Login isHide={!switchState}/>
                    <div className={'register-form__close'} onClick={() => setHaveForm(false)}></div>
                </div>
            </div>
        )
    } else {
        return <></>;
    }
};

export default RegisterForm;