import React, {useState} from 'react';

import './index.sass'
import CheckComponent from "../CheckComponent/CheckComponent";

import trash from '../../images/decor/trash.svg';
import {makeFullPhotoUrl} from "../../helpers";
import {NavLink} from "react-router-dom";

interface ICartItem {
    photo: string,
    title: string,
    cartCount: number,
    price: number,
    isChecked: boolean,
    changeChecked: Function,
    changeCountItem: Function,
    id: number
}

const CartItem = ({isChecked, photo, price, title, cartCount, changeChecked, id, changeCountItem}: ICartItem) => {

    return (
        <div className={'cart-item'}>
            <img className={'cart-item__photo'} src={makeFullPhotoUrl(photo)} alt={title}/>
            <div className={'cart-item__wrapper'}>
                <NavLink to={`/product/${id}`} target={"_blank"} className={'cart-item__title'}>{title}</NavLink>
                <div className={'cart-item__count-wrapper'}>
                    <div className={'cart-item__count-decrease'} onClick={() => changeCountItem(id, 'decrease')}>{
                        cartCount != 1
                        ? '-'
                        : <img src={trash} alt={'trash'} />
                    }</div>
                    <span>{cartCount}</span>
                    <div className={'cart-item__count-increase'} onClick={() => changeCountItem(id, 'increase')}>+</div>
                </div>
                <p className={'cart-item__price'}>{price} $</p>
            </div>
            <CheckComponent state={isChecked} changeFunction={changeChecked} />
        </div>
    );
};

export default CartItem;