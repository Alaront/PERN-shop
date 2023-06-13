import React from 'react';
import {NavLink} from "react-router-dom";

const SellingRules = () => {
    return (
        <>
            <h2>Правила продажи товаров в интернет-магазине PERN SHOP</h2>
            <div>
                <p>Товары, размещенные на сайте, предназначены для личного потребления.</p>
                <p>Закон <NavLink to={'https://www.consultant.ru/document/cons_doc_LAW_305/'} target={"_blank"}>«О защите прав потребителей»</NavLink> .</p>
            </div>
        </>
    );
};

export default SellingRules;
