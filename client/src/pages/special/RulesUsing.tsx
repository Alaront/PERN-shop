import React from 'react';
import {NavLink} from "react-router-dom";

const RulesUsing = () => {
    return (
        <>
            <h2>Правила пользования торговой площадкой</h2>
            <div>
                <p>Используя "PERN SHOP" вы соглашаетесь с <NavLink to={`${process.env.REACT_APP_API_URL}/pdf/user_greement.pdf`} target={"_blank"}>Пользовательским соглашением</NavLink> </p>
                <p>Используя "PERN SHOP" вы соглашаетесь с <NavLink to={`${process.env.REACT_APP_API_URL}/pdf/privacy_policy.pdf`} target={"_blank"}>Политикой конфиденциальности</NavLink> </p>
            </div>
        </>
    );
};

export default RulesUsing;
