import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import DailySlide from "./DailySlide";

import watchPhoto from '../../images/products/watch.png'

import './index.sass'
import 'swiper/css';

const Daily = () => {
    return (
        <div className={'deals'}>
            <div className={'deals__title'}>
                <div className={'deals__text'}>
                    <p className={'deals__text-title'}>Скидки сегодня</p>
                </div>
                <div className={'deals__time'}>03:13:34</div>
            </div>
            <div className={'deals__offers'}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={'auto'}
                    className={'deals-slider'}
                >
                    <SwiperSlide>
                        <DailySlide title={'Smart watches'} discount={25} photo={watchPhoto} linkHref={"#"}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <DailySlide title={'Laptops'} discount={75} photo={watchPhoto} linkHref={"#"}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <DailySlide title={'GoPro cameras'} discount={50} photo={watchPhoto} linkHref={"#"}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <DailySlide title={'Headphones'} discount={40} photo={watchPhoto} linkHref={"#"}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <DailySlide title={'Canon camreras'} discount={85} photo={watchPhoto} linkHref={"#"}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <DailySlide title={'Blenders'} discount={85} photo={watchPhoto} linkHref={"#"}/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Daily;