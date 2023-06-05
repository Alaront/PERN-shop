import React from 'react';

interface topDiscountI {
    price: number,
    discount: number
}

const TopDiscount = ({discount, price}:topDiscountI) => {
    return (
        <div className={"top-content__info-discount"}>
            <p className={'top-content__old-price'}>&nbsp;$ {price.toFixed(2)}&nbsp;</p>
            <p className={'top-content__discount'}>{discount}%</p>
        </div>
    );
};

export default TopDiscount;