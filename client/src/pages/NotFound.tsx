import React from 'react';

import './../styles/notFound.sass'
import {NavLink} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={'content not-found-page'}>
            <h6>Упс.. Эта страница не найдена</h6>
            <p>Вы всегда можете <NavLink to={'/'}>вернуться на главную</NavLink></p>

            <span>404</span>
        </div>
    );
};

export default NotFound;