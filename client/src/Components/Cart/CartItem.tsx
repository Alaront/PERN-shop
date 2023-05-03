import React, {useState} from 'react';

import './index.sass'
import CheckComponent from "../CheckComponent/CheckComponent";

import trash from '../../images/decor/trash.svg';
import {makeFullPhotoUrl} from "../../helpers";

interface ICartItem {
    photo: string,
    title: string,
    count: number,
    price: number,
    isChecked: boolean,
    changeChecked: Function
}

const CartItem = ({isChecked, photo, price, title, count, changeChecked}: ICartItem) => {
    const [isCheck, setIsCheck] = useState<boolean>(false);

    return (
        <div className={'cart-item'}>
            <img className={'cart-item__photo'} src={makeFullPhotoUrl(photo)} alt={title}/>
            <div className={'cart-item__wrapper'}>
                <p className={'cart-item__title'}>{title}</p>
                <div className={'cart-item__count-wrapper'}>
                    <div className={'cart-item__count-decrease'}>{
                        count != 1
                        ? '-'
                        : <img src={trash} alt={'trash'} />
                    }</div>
                    <span>{count}</span>
                    <div className={'cart-item__count-increase'}>+</div>
                </div>
                <p className={'cart-item__price'}>{price} $</p>
            </div>
            <CheckComponent state={isChecked} changeFunction={changeChecked} />
        </div>
    );
};

export default CartItem;