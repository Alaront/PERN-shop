import React from 'react';
import TopContent from "../Components/Product/Top/TopContent";
import Description from "../Components/Product/Description/Description";
import ReviewsProduct from "../Components/Product/Description/ReviewsProduct";

const Product = () => {
    return (
        <div className={'content product-content'}>
            <TopContent />
            <Description />
            <ReviewsProduct />
        </div>
    );
};

export default Product;