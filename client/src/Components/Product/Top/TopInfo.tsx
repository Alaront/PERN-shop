import React from 'react';
import {typeProduct} from "./TopContent";
import {writeLSShopingCart} from "../../../helpers";

interface ContentInfo {
    productId: number,
    price: number,
    discount: number,
}

const TopInfo = ({discount, productId, price}: ContentInfo) => {

    return (
        <div className={'top-content__info'}>

            <div className={"top-content__info-price"}>
                {
                    discount > 0 && (
                        <div className={"top-content__info-discount"}>
                            <p className={'top-content__old-price'}>&nbsp;$ {price.toFixed(2)}&nbsp;</p>
                            <p className={'top-content__discount'}>{discount}%</p>
                        </div>
                    )
                }
                <p className={"top-content__price"}><span>Цена:</span> $ {(price - ((price * discount) / 100)).toFixed(2)}</p>
                <button className={'top-content__buy'} onClick={() => writeLSShopingCart(productId, 1)}>В корзну</button>
            </div>
        </div>
    );
};

export default TopInfo;