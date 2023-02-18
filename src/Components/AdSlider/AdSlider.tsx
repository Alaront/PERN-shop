import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper';

import AdSliderOne from "./adSliderItems/adSliderOne";
import AdSldierTwo from "./adSliderItems/adSldierTwo";
import AdSliderThree from "./adSliderItems/adSliderThree";

import 'swiper/css';
import './index.sass';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AdSlider = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={'auto'}
            speed={800}
            className={'ad-slider'}
            navigation
            pagination={{ clickable: true }}
        >
            <SwiperSlide>
                <AdSliderOne />
            </SwiperSlide>
            <SwiperSlide>
                <AdSldierTwo />
            </SwiperSlide>
            <SwiperSlide>
                <AdSliderThree />
            </SwiperSlide>
        </Swiper>
    );
};

export default AdSlider;