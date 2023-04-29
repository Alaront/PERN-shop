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
            <div className={'product-card-short__content'}>
                {
                    discount > 0 && (
                        <div className={"product-card-short__discount-wrapper"}>
                            <p className={'product-card-short__old-price'}>&nbsp;$ {price.toFixed(2)}&nbsp;</p>
                            <p className={'product-card-short__discount'}>{discount}%</p>
                        </div>
                    )
                }
                <p className={'product-card-short__price'}>
                    {(price - ((price * discount) / 100)).toFixed(2)}&nbsp;$
                </p>
                <NavLink className={'product-card-short__title'} to={`/product/${hrefLink}`}>{title}</NavLink>
            </div>
        </div>
    );
};

export default ProductCartShort;