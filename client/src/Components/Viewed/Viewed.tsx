import React from 'react';
import ProductCartShort from "../Products/ProductCartShort";


import './index.sass';
import Bitmap from "../../images/products/Bitmap.png";

const Viewed = () => {
    return (
        <div className={'viewed'}>
            <p className={'viewed__title'}>Вы смотрели</p>
            <div className={'viewed__wrapper-card'}>
                {/*<ProductCartShort title={'T-shirts with multiple colors, for men'} photoUrl={Bitmap} price={7.30} hrefLink={"#"} />*/}
                {/*<ProductCartShort title={'T-shirts with multiple colors, for men'} photoUrl={Bitmap} price={10} oldPrice={9} hrefLink={"#"} />*/}
            </div>
        </div>
    );
};

export default Viewed;