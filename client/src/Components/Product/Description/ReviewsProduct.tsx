import React, {useState} from 'react';

import './index.sass'
import ReviewsItem from "./ReviewsItem";
import ReviewsForm from "./ReviewsForm";

const ReviewsProduct = () => {
    const [showReviewsForm, setShowReviewsForm] = useState<Boolean>(true)

    return (
        <div className={'reviews-product'}>
            <p className={'reviews-product__title'}>Отзывы</p>
            <div className={'reviews-product__wrapper'}>
                <ReviewsItem />
                <ReviewsItem />
                <ReviewsItem />
            </div>
            <div className={'reviews-product__score'}>
                <p className={'reviews-product__title'}>Уже купили ?</p>
                <p className={'reviews-item__answer'} onClick={() => setShowReviewsForm(true)}>Оставьте отзыв</p>
            </div>
            {showReviewsForm && <ReviewsForm closeForm={() => setShowReviewsForm(false)}/>}
        </div>
    );
};

export default ReviewsProduct;