import React from 'react';
import {writeLSShopingCart} from "../../../helpers";

interface topPriceI {
    price: number,
    discount: number,
    productId: number
}

const TopPrice = ({discount, price, productId}:topPriceI) => {
    return (
        <>
            <p className={"top-content__price"}><span>Цена:</span> $ {(price - ((price * discount) / 100)).toFixed(2)}</p>
            <button className={'top-content__buy'} onClick={() => writeLSShopingCart(productId, 1)}>В корзину</button>
        </>
    );
};

export default TopPrice;