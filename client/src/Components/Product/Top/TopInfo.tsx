import React from 'react';
import {typeProduct} from "./TopContent";
import {writeLSShopingCart} from "../../../helpers";

interface ContentInfo {
    productId: number,
    price: number,
    oldPrice?: number,
    discount?: number
}

const TopInfo = ({discount, productId, price, oldPrice}: ContentInfo) => {
    const changeTypeProduct = (id: number):void => {
        console.log(id)
    }

    return (
        <div className={'top-content__info'}>

            <div className={"top-content__info-price"}>
                {
                    discount && (
                        <div className={"top-content__info-discount"}>
                            <p className={'top-content__old-price'}>&nbsp;$ {oldPrice}&nbsp;</p>
                            <p className={'top-content__discount'}>{discount}%</p>
                        </div>
                    )
                }
                <p className={"top-content__price"}>$ {price}</p>
                <button className={'top-content__buy'} onClick={() => writeLSShopingCart(0, 1)}>В корзну</button>
            </div>
        </div>
    );
};

export default TopInfo;