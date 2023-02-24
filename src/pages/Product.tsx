import React from 'react';
import TopContent from "../Components/Product/Top/TopContent";
import Description from "../Components/Product/Description/Description";

const Product = () => {
    return (
        <div className={'content product-content'}>
            <TopContent />
            <Description />
        </div>
    );
};

export default Product;