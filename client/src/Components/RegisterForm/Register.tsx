import React, {useState} from 'react';
import {$host} from "../../axios";
import jwtDecode from "jwt-decode";
import {setIsAuth, setUser} from "../../redux/slice/user";
import {useAppDispatch} from "../../redux/helpers";
import {NavLink} from "react-router-dom";

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

    const dispatch = useAppDispatch();

    const validation = (): boolean => {
        let status = false;

        if(!name.data.length) {
            status = true;
            console.log('error')
            setName({...name, error: true})
        }

        if(!mail.data.length) {
            status = true;
            console.log('error')
            setMail({...mail, error: true})
        }

        return status
    }

    const formPush = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if(validation()) return

        if(name.error || mail.error || pass.error || repPass.error) return

        console.log('start');

        const params = {
            name: name.data,
            email: mail.data,
            pass: pass.data
        }

        $host.post('/user/registration', params)
            .then(response => {
                dispatch(setUser(jwtDecode(response.data.token)))
                dispatch(setIsAuth(true))
                localStorage.setItem('pern-shop-token', response.data.token)
            })
            .catch(e => {
                alert(e)
            })
    }

    const changeField = ({target}: React.ChangeEvent<HTMLInputElement>, fieldType: string):void => {
        console.log('change')

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
                {
                    name.error &&  <p className={'error-text'}>Введите корректное имя пользователя</p>
                }
            </label>
            <label className={'register-form-mail'}>
                <p>Почта</p>
                <input type={'text'} className={`${mail.error ? 'error-text' : ''}`} value={mail.data} onChange={e => changeField(e, 'mail')} />
                {
                    mail.error &&  <p className={'error-text'}>Введите корректную почту пользователя</p>
                }
            </label>
            <label className={'register-form-pass'}>
                <p>Пароль</p>
                <input type={`${pass.show ? 'text' : 'password'}`} className={`${pass.error ? 'error-text' : ''}`} value={pass.data} onChange={e => changeField(e, 'pass')} />
                <span onClick={() => { setPass({...pass, show: !pass.show}) }} className={`${pass.show ? '' : 'pass-close'}`}></span>
                {
                    pass.error &&  <p className={'error-text'}>Введите корректный пароль, пример rdr34fFD#</p>
                }
            </label>
            <label className={'register-form-rep-pass'}>
                <p>Повторите пароль</p>
                <input type={`${repPass.show ? 'text' : 'password'}`} className={`${repPass.error ? 'error-text' : ''}`} value={repPass.data} onChange={e => changeField(e, 'repPass')} />
                <span onClick={() => { setRepPass({...repPass, show: !repPass.show}) }} className={`${repPass.show ? '' : 'pass-close'}`}></span>
                {
                    repPass.error &&  <p className={'error-text'}>пароли не совпадают</p>
                }
            </label>
            <button className={'register-form-rep-btn'}>регистрация</button>
            <span className={'register-form-rep-info'}>Регистрируясь на "PERN SHOP" вы соглашаетесь с <NavLink to={`${process.env.REACT_APP_API_URL}/pdf/user_greement.pdf`} target={"_blank"}>Пользовательским соглашением</NavLink> и <NavLink to={`${process.env.REACT_APP_API_URL}/pdf/privacy_policy.pdf`} target={"_blank"}>Политикой конфиденциальности</NavLink> </span>
        </form>
    );
};

export default Register;
