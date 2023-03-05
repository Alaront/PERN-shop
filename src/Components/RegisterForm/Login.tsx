import React, {useState} from 'react';

interface loginPropsI {
    isHide: boolean
}

interface fieldDataI {
    data: string,
    error?: boolean,
    show?: boolean
}

const Login = ({isHide}:loginPropsI) => {
    const [mail, setMail] = useState<fieldDataI>({
        data: '',
        error: false
    });
    const [pass, setPass] = useState<fieldDataI>({
        data: '',
        show: false
    });

    const changeField = ({target}: React.ChangeEvent<HTMLInputElement>, fieldType: string):void => {
        if(fieldType === 'mail') {
            setMail({data: target.value, error: !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(target.value)});
        }

        if(fieldType === 'pass') {
            setPass({...pass, data: target.value});
        }
    }

    const pushForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className={`register-form__login ${isHide ? 'register-form__login--hide' : ''}`} onSubmit={e => pushForm(e)}>
            <label className={'register-form-mail'}>
                <p>Почта</p>
                <input type={'text'} className={`${mail.error ? 'error-text' : ''}`} value={mail.data} onChange={e => changeField(e, 'mail')} />
            </label>
            <label className={'register-form-pass'}>
                <p>Пароль</p>
                <input type={`${pass.show ? 'text' : 'password'}`} value={pass.data} onChange={e => changeField(e, 'pass')} />
                <span onClick={() => { setPass({...pass, show: !pass.show}) }} className={`${pass.show ? '' : 'pass-close'}`}></span>
            </label>
            <button className={'register-form-rep-btn'}>ВХОД</button>
        </form>
    );
};

export default Login;