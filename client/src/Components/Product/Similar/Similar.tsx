import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";

import './index.sass'
import 'swiper/css';
import watchPhoto from "../../../images/products/watch.png";
import ProductCartShort from "../../Products/ProductCartShort";
import {deviceSimilar} from "../../../helpers/interfaces";

interface SimilarI {
    allSimilar: Array<deviceSimilar>
}

const Similar = ({allSimilar}:SimilarI) => {
    console.log(allSimilar[0].deviceInfo.fullName)
    return (
        <div className={'similar-products'}>
            <h6 className={'similar-products__title'}>Похожие товары</h6>

            <div className={'similar-products__products'}>
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={'auto'}
                    className={'similar-products__slider'}
                    spaceBetween={20}
                    navigation
                >
                    {allSimilar && allSimilar.map(item => (
                        <SwiperSlide key={item.id}>
                            <ProductCartShort title={item.deviceInfo.fullName} photoUrl={item.deviceInfo.mainPhoto} price={item.price} discount={item.discount} hrefLink={String(item.id)} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Similar;