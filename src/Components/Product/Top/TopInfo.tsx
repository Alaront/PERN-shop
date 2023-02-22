import React from 'react';
import {typeProduct} from "./TopContent";

interface ContentInfo {
    productId: number,
    price: number,
    oldPrice?: number,
    discount?: number,
    typeArray?: typeProduct[]
}

const TopInfo = ({discount, productId, price, oldPrice, typeArray}: ContentInfo) => {
    const changeTypeProduct = (id: number):void => {
        console.log(id)
    }

    return (
        <div className={'top-content__info'}>
            <div className={'top-content__info-type'}>
                {
                    typeArray && typeArray.map(item => (
                        <div className={'top-content__info-type-item'} onClick={() => changeTypeProduct(item.id)} key={item.id}>
                            <p>{item.title}</p>
                            <div>
                                <img src={item.photoUrl} alt={item.title}/>
                            </div>
                        </div>
                    ))
                }
            </div>

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
                <button className={'top-content__buy'}>В корзну</button>
            </div>
        </div>
    );
};

export default TopInfo;