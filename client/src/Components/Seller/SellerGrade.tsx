import React from 'react';

import './index.sass'
import {Swiper, SwiperSlide} from  "swiper/react";
import { Pagination} from "swiper";
import SellerComment from "./SellerComment";
import GradeStars from "../Grade/GradeStars";

const SellerGrade = () => {
    return (
        <div className={'seller-grade'}>
            <div className={'seller-grade__slider'}>
                <h4 className={'seller-grade__title'}>Отзывы о магазине «Seller number oNe»</h4>
                <Swiper
                    modules={[Pagination]}
                    slidesPerView={'auto'}
                    className={'deals-slider'}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide>
                        <SellerComment />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SellerComment />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SellerComment />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={'seller-grade__grade'}>
                <p className={'seller-grade__grade-title'}>Средняя оценка</p>
                <GradeStars grade={3} />
                <p className={'seller-grade__text'}>{3} / 5</p>
            </div>
        </div>
    );
};

export default SellerGrade;