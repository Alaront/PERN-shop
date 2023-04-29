import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";

import 'swiper/css';

import watchPhoto from "../../../images/products/watch.png";
import {makeFullPhotoUrl} from "../../../helpers";

interface TopSliderI {
    mainPhoto: string,
    otherPhotos: Array<string>
}

const TopSlider = ({mainPhoto, otherPhotos}: TopSliderI) => {
    return (
        <div className={'top-slider'}>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={'auto'}
                className={'deals-slider'}
                navigation
                pagination={{ clickable: true }}
            >
                {
                    [mainPhoto, ...otherPhotos].map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={'deals-slider_img'}>
                                <img src={makeFullPhotoUrl(item)} alt={'photo'}/>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default TopSlider;