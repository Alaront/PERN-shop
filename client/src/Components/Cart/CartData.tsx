import React from 'react';
import CartItem from "./CartItem";

import Bitmap from '../../images/products/Bitmap.png'
import CheckComponent from "../CheckComponent/CheckComponent";

import './index.sass'
import {deviceCartI} from "../../helpers/interfaces";

interface ICartData {
    mainCheck: boolean
    changeMainCheck: Function,
    product: Array<deviceCartI>,
    changeChecked: Function
}

const CartData = ({mainCheck, changeMainCheck, product, changeChecked}: ICartData) => {
    return (
        <div className={'cart-data'}>
            <div className={'cart-data__info'}>
                <p>Корзина</p>
                <div className={'cart-data__check'}>
                    <CheckComponent state={mainCheck} changeFunction={changeMainCheck}/>
                </div>
            </div>
            <div className={'cart-data__list'}>
                {
                    product && product.map(item => <CartItem key={item.id} photo={item.deviceInfo.mainPhoto} title={item.deviceInfo.fullName} count={item.cartCount} price={item.price} isChecked={item.isCheck} changeChecked={() => changeChecked(item.id)} />)
                }
            </div>
        </div>
    );
};

export default CartData;