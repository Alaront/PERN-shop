import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";

import './index.sass'
import 'swiper/css';
import watchPhoto from "../../../images/products/watch.png";
import ProductCartShort from "../../Products/ProductCartShort";

const Similar = () => {
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
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter'} photoUrl={watchPhoto} price={12} hrefLink={'#'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter 2'} photoUrl={watchPhoto} price={15} hrefLink={'#'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter 3'} photoUrl={watchPhoto} price={8} hrefLink={'#'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter 4'} photoUrl={watchPhoto} price={19} hrefLink={'#'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter'} photoUrl={watchPhoto} price={12} hrefLink={'#'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter 2'} photoUrl={watchPhoto} price={15} hrefLink={'#'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter 3'} photoUrl={watchPhoto} price={8} hrefLink={'#'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter 4'} photoUrl={watchPhoto} price={19} hrefLink={'#'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCartShort title={'Swifter 4'} photoUrl={watchPhoto} price={19} hrefLink={'#'} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Similar;