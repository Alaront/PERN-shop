import React from 'react';

import './index.sass'
import {NavLink} from "react-router-dom";
import {makeFullPhotoUrl} from "../../helpers";

interface ProductCartShortI {
    title: string,
    photoUrl: string,
    price: number,
    discount: number,
    hrefLink: string,
    oldPrice?: number,
}

const ProductCartShort = ({discount, photoUrl, price, title, hrefLink, oldPrice}: ProductCartShortI) => {
    return (
        <div className={'product-card-short'}>
            <div className={'product-card-short__photo'}>
                <img src={makeFullPhotoUrl(photoUrl)} alt={title}/>
            </div>
            <p className={'product-card-short__price'}>
                $ {(price - ((price * discount) / 100)).toFixed(2)}
            </p>
            <NavLink className={'product-card-short__title'} to={`/product/${hrefLink}`}>{title}</NavLink>
        </div>
    );
};

export default ProductCartShort;