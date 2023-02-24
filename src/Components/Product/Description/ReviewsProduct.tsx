import React from 'react';

import './index.sass'
import ReviewsItem from "./ReviewsItem";

const ReviewsProduct = () => {
    return (
        <div className={'reviews-product'}>
            <p className={'reviews-product__title'}>Отзывы</p>
            <div className={'reviews-product__wrapper'}>
                <ReviewsItem />
                <ReviewsItem />
                <ReviewsItem />
            </div>
        </div>
    );
};

export default ReviewsProduct;