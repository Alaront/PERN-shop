import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";

import 'swiper/css';

import watchPhoto from "../../../images/products/watch.png";

const TopSlider = () => {
    return (
        <div className={'top-slider'}>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={'auto'}
                className={'deals-slider'}
                navigation
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <div className={'deals-slider_img'}>
                        <img src={watchPhoto} alt={'photo'}/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={'deals-slider_img'}>
                        <img src={watchPhoto} alt={'photo'}/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={'deals-slider_img'}>
                        <img src={watchPhoto} alt={'photo'}/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={'deals-slider_img'}>
                        <img src={watchPhoto} alt={'photo'}/>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default TopSlider;