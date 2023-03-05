import React, {useState} from 'react';
import logo from '../images/shop-logo.svg'
import Search from "../Components/Search/Search";

import '../styles/header.sass'
import {Link} from "react-router-dom";
import RegisterForm from "../Components/RegisterForm/RegisterForm";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [haveForm, setHaveForm] = useState<boolean>(false);

    const loginEvent = () => {
        if(isLogin) {

        } else {
            setHaveForm(true)
        }
    }

    return (
        <header className="header">
            <div className={'header-wrapper'}>
                <div className={'header__left'}>
                    <img src={logo} alt={'logo'} className={'header__logo'}/>
                    <div className={'header__menu-btn'}>Каталог</div>
                </div>
                <Search />
                <div className={'header__right'} >
                    <Link to={"#"} className={'header__cart'}></Link>
                    <Link to={"#"} className={`header__prof header__prof--${isLogin ? 'logout' : 'login'}`} onClick={loginEvent}></Link>
                </div>
            </div>
            <RegisterForm haveForm={haveForm} setHaveForm={setHaveForm} />
        </header>
    );
};

export default Header;