import React from 'react';

interface ProductCartShortI {
    title: string,
    photoUrl: string,
    price: number,
    oldPrice?: number,
    hrefLink: string
}

const ProductCartShort = ({oldPrice, photoUrl, price, title, hrefLink}: ProductCartShortI) => {
    return (
        <div className={'product-card-short'}>
            <div className={'product-card-short__photo'}>
                <img src={photoUrl} alt={title}/>
            </div>
            <p className={'product-card-short__price'}>
                ${price.toFixed(2)}
                {
                    oldPrice ? <span>{oldPrice.toFixed(2)}</span> : ''
                }
            </p>
            <a className={'product-card-short__title'} href={hrefLink}>{title}</a>
        </div>
    );
};

export default ProductCartShort;