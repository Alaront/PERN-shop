import React from 'react';
import {makeFullPhotoUrl} from "../../helpers";
import {NavLink} from "react-router-dom";

interface SearchItemI {
    imgUrl: string,
    name: string,
    price: number,
    id: string
}

const SearchItem = ({id, imgUrl, price, name}:SearchItemI) => {
    return (
        <div className={'header__search-item'}>
            <div className={'header__search-item-photo'}>
                <img src={makeFullPhotoUrl(imgUrl)} alt={name}/>
            </div>
            <div className={'header__search-item-info'}>
                <NavLink to={String(`/product/${id}`)} target={'_blank'}>{name}</NavLink>
                <span>{price}$</span>
            </div>
        </div>
    );
};

export default SearchItem;