import React from 'react';
import {Outlet} from "react-router";
import './style.sass'

const Specials = () => {
    return (
        <div className={'content special'}>
            <div>
                <h3>ПРОЕКТ НЕ ЯВЛЯЕТСЯ КОМЕРЧЕСКИМ</h3>
                <p>У вас не получится что-то действительно купить или продать. Все предоставленные товары лишь ознакомительные</p>
            </div>
            <Outlet />
        </div>
    );
};

export default Specials;
