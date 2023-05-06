import React, {useEffect, useMemo, useState} from 'react';
import logo from '../images/shop-logo.svg'
import Search from "../Components/Search/Search";

import '../styles/header.sass'
import {Link, NavLink} from "react-router-dom";
import RegisterForm from "../Components/RegisterForm/RegisterForm";
import {readLSShopingCart} from "../helpers";
import {EVENT_ADD_GOODS_CARD} from "../helpers/consts";
import {useSelector} from "react-redux";
import {setIsAuth, setUser} from "../redux/slice/user";
import jwtDecode from "jwt-decode";
import {useAppDispatch} from "../redux/helpers";
import Catalog from "../Components/Catalog/Catalog";

const Header = () => {
    const [haveForm, setHaveForm] = useState<boolean>(false);
    const [goodsCount, setGoodsCount] = useState<number>(0);
    const [showCatalog, setShowCatalog] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    // @ts-ignore
    const isLogin = useSelector((state) => state.user)

    const getGoodsCount = () => {
        //console.log('getGoodsCount')
        readLSShopingCart()
            .then(data => {
                let count: number = 0;
                data.forEach(item => count += item.count);
                setGoodsCount(count)
            })
    }

    useEffect( ()  => {
        getGoodsCount();

        document.addEventListener(EVENT_ADD_GOODS_CARD, () => getGoodsCount())

        return () => {
            document.removeEventListener(EVENT_ADD_GOODS_CARD, () => getGoodsCount());
        }

    }, [])

    const loginEvent = () => {
        if(isLogin.isAuth) {
            dispatch(setUser({}))
            dispatch(setIsAuth(false))
            localStorage.removeItem('pern-shop-token')
        } else {
            setHaveForm(true)
        }
    }

    if (window.location.href.includes('admin')) {
        return <></>
    }

    return (
        <header className="header">
            <div className={'header-wrapper'}>
                <div className={'header__left'}>
                    <NavLink to={'/'}>
                        <img src={logo} alt={'logo'} className={'header__logo'}/>
                    </NavLink>
                    <div className={`header__menu-btn ${showCatalog ? 'header__menu-btn--close' : ''}`} onClick={() => setShowCatalog(!showCatalog)}>Каталог</div>
                </div>
                <Search />
                <div className={'header__right'} >
                    <Link to={"/cart"} className={'header__cart'}>
                        {
                            goodsCount > 0 && <span>{goodsCount}</span>
                        }
                    </Link>
                    {
                        isLogin.isAuth && <Link to={"/userSetting"} className={'header__user-setting'}></Link>
                    }
                    <Link to={"#"} className={`header__prof header__prof--${isLogin.isAuth ? 'logout' : 'login'}`} onClick={loginEvent}></Link>
                </div>
            </div>
            <RegisterForm haveForm={haveForm && !isLogin.isAuth} setHaveForm={setHaveForm} />
            <Catalog show={showCatalog}/>
        </header>
    );
};

export default Header;