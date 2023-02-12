import React, {useState} from 'react';
import logo from '../images/shop-logo.svg'
import Search from "../Components/Search/Search";

import '../styles/header.sass'
import {Link} from "react-router-dom";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);

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
                    <Link to={"#"} className={`header__prof header__prof--${isLogin ? 'logout' : 'login'}`}></Link>
                </div>
            </div>
        </header>
    );
};

export default Header;