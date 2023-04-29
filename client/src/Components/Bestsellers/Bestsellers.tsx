import React from 'react';
import Bitmap from '../../images/products/Bitmap.png'

import './index.sass'
import ProductCartShort from "../Products/ProductCartShort";
const Bestsellers = () => {
    return (
        <div className={'bestsellers'}>
            <h3 className={'bestsellers__title'}>Хиты продаж</h3>
            <div className={'bestsellers__wrapper-card'}>
                {/*<ProductCartShort title={'T-shirts with multiple colors, for men'} photoUrl={Bitmap} price={7.30} hrefLink={"#"} />*/}
                {/*<ProductCartShort title={'T-shirts with multiple colors, for men'} photoUrl={Bitmap} price={10} oldPrice={9} hrefLink={"#"} />*/}
                {/*<ProductCartShort title={'T-shirts with multiple colors, for men'} photoUrl={Bitmap} price={10.30} hrefLink={"#"} />*/}
                {/*<ProductCartShort title={'T-shirts with multiple colors, for men'} photoUrl={Bitmap} price={3} hrefLink={"#"} />*/}
                {/*<ProductCartShort title={'T-shirts with multiple colors, for men'} photoUrl={Bitmap} price={3.2} oldPrice={92} hrefLink={"#"} />*/}
                {/*<ProductCartShort title={'T-shirts with multiple colors, for men'} photoUrl={Bitmap} price={12.80} oldPrice={32} hrefLink={"#"} />*/}
            </div>
        </div>
    );
};

export default Bestsellers;