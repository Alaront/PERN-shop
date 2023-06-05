import React from 'react';
import {writeLSShopingCart} from "../../../helpers";
import TopBrand from "./TopBrand";
import TopDiscount from "./TopDiscount";
import TopPrice from "./TopPrice";

interface ContentInfo {
    productId: number,
    price: number,
    discount: number,
    brand: number
}

const TopInfo = ({discount, productId, price, brand}: ContentInfo) => {

    return (
        <div className={'top-content__info'}>
            <div className={"top-content__info-price"}>
                <TopBrand brandParams={brand}/>
                {
                    discount > 0 && <TopDiscount discount={discount} price={price} />
                }
                <TopPrice price={price} discount={discount} productId={productId} />
            </div>
        </div>
    );
};

export default TopInfo;