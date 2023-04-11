import React, {useEffect, useMemo, useState} from 'react';
import logo from '../images/shop-logo.svg'
import Search from "../Components/Search/Search";

import '../styles/header.sass'
import {Link} from "react-router-dom";
import RegisterForm from "../Components/RegisterForm/RegisterForm";
import {readLSShopingCart} from "../helpers";
import {EVENT_ADD_GOODS_CARD} from "../helpers/consts";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [haveForm, setHaveForm] = useState<boolean>(false);
    const [goodsCount, setGoodsCount] = useState<number>(0)

    const getGoodsCount = () => {
        console.log('getGoodsCount')
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
        if(isLogin) {

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
                    <img src={logo} alt={'logo'} className={'header__logo'}/>
                    <div className={'header__menu-btn'}>Каталог</div>
                </div>
                <Search />
                <div className={'header__right'} >
                    <Link to={"#"} className={'header__cart'}>
                        {
                            goodsCount > 0 && <span>{goodsCount}</span>
                        }
                    </Link>
                    <Link to={"#"} className={`header__prof header__prof--${isLogin ? 'logout' : 'login'}`} onClick={loginEvent}></Link>
                </div>
            </div>
            <RegisterForm haveForm={haveForm} setHaveForm={setHaveForm} />
        </header>
    );
};

export default Header;