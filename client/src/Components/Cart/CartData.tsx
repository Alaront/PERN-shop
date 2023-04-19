import React from 'react';
import CartItem from "./CartItem";

import Bitmap from '../../images/products/Bitmap.png'
import CheckComponent from "../CheckComponent/CheckComponent";

import './index.sass'

interface ICartData {
    mainCheck: boolean
    changeMainCheck: Function
}

const CartData = ({mainCheck, changeMainCheck}: ICartData) => {
    return (
        <div className={'cart-data'}>
            <div className={'cart-data__info'}>
                <p>Корзина</p>
                <div className={'cart-data__check'}>
                    <CheckComponent state={mainCheck} changeFunction={changeMainCheck}/>
                </div>
            </div>
            <div className={'cart-data__list'}>
                <CartItem photo={Bitmap} title={'Подставка для видеокарты CoolMoon CM-VT192 из алюминиевого сплава, держатель для видеокарт, охлаждающий комплект'} count={2} price={1212} isChecked={false} />
                <CartItem photo={Bitmap} title={'Product 2'} count={2} price={12} isChecked={true} />
                <CartItem photo={Bitmap} title={'Product 3'} count={12} price={1212} isChecked={false} />
            </div>
        </div>
    );
};

export default CartData;