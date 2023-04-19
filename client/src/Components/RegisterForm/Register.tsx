import React, {useState} from 'react';

interface registerPropsI {
    isHide: boolean
}

interface fieldDataI {
    data: string,
    error: boolean,
    show?: boolean
}

const Register = ({isHide}: registerPropsI) => {
    const [name, setName] = useState<fieldDataI>({
        data: '',
        error: false
    });
    const [mail, setMail] = useState<fieldDataI>({
        data: '',
        error: false
    });
    const [pass, setPass] = useState<fieldDataI>({
        data: '',
        error: false,
        show: false
    });
    const [repPass, setRepPass] = useState<fieldDataI>({
        data: '',
        error: false,
        show: false
    });

    const formPush = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const changeField = ({target}: React.ChangeEvent<HTMLInputElement>, fieldType: string):void => {
        if(fieldType === 'name') {
            setName({data: target.value, error: !/^[a-zA-Zа-яА-я ]+$/.test(target.value)});
        }

        if(fieldType === 'mail') {
            setMail({data: target.value, error: !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(target.value)});
        }

        if(fieldType === 'pass') {
            setPass({...pass, data: target.value, error: !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(target.value)});
        }

        if(fieldType === 'repPass') {
            setRepPass({...repPass, data: target.value, error: target.value !== pass.data});
        }
    }

    return (
        <form className={`${isHide ? 'register-form__register--hide' : ''} register-form__register`} onSubmit={e => formPush(e)}>
            <label className={'register-form-name'}>
                <p>Имя</p>
                <input type={'text'} className={`${name.error ? 'error-text' : ''}`} value={name.data} onChange={e => changeField(e, 'name')} />
            </label>
            <label className={'register-form-mail'}>
                <p>Почта</p>
                <input type={'text'} className={`${mail.error ? 'error-text' : ''}`} value={mail.data} onChange={e => changeField(e, 'mail')} />
            </label>
            <label className={'register-form-pass'}>
                <p>Пароль</p>
                <input type={`${pass.show ? 'text' : 'password'}`} className={`${pass.error ? 'error-text' : ''}`} value={pass.data} onChange={e => changeField(e, 'pass')} />
                <span onClick={() => { setPass({...pass, show: !pass.show}) }} className={`${pass.show ? '' : 'pass-close'}`}></span>
            </label>
            <label className={'register-form-rep-pass'}>
                <p>Повторите пароль</p>
                <input type={`${repPass.show ? 'text' : 'password'}`} className={`${repPass.error ? 'error-text' : ''}`} value={repPass.data} onChange={e => changeField(e, 'repPass')} />
                <span onClick={() => { setRepPass({...repPass, show: !repPass.show}) }} className={`${repPass.show ? '' : 'pass-close'}`}></span>
            </label>
            <button className={'register-form-rep-btn'}>регистрация</button>
            <span className={'register-form-rep-info'}>Регистрируясь на "PERN SHOP" вы соглашаетесь с <a href={'#'}>Пользовательским соглашением</a> и <a href={'#'}>Политикой конфиденциальности</a> </span>
        </form>
    );
};

export default Register;