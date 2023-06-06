import React, {useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import { ReactFullscreenCarousel, ISlide } from 'react-fullscreen-carousel';

import 'swiper/css';

import {makeFullPhotoUrl} from "../../../helpers";

interface TopSliderI {
    mainPhoto: string,
    otherPhotos: Array<string>
}

const TopSlider = ({mainPhoto, otherPhotos}: TopSliderI) => {
    const [open, setOpen] = useState<boolean>(false)
    const [sliderCurrent, setSliderCurrent] = useState<number>(0)

    const getSliderPhoto = ():Array<ISlide> => {
        return [{img: makeFullPhotoUrl(mainPhoto), alt: "image"}, ...otherPhotos.map(item => {return {img: makeFullPhotoUrl(item), alt: "image"}})]
    }
    getSliderPhoto()
    const clickOnSlider = (index:number):void => {
        setSliderCurrent(index)
        setOpen(!open)
    }

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
                        <SwiperSlide key={index} onClick={() => clickOnSlider(index)}>
                            <div className={'deals-slider_img'}>
                                <img src={makeFullPhotoUrl(item)} alt={'photo'}/>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {open ?
                <ReactFullscreenCarousel slides={getSliderPhoto()} handleClose={() => setOpen(false)} startSlideIndex={sliderCurrent}  />
                : null
            }
        </div>
    );
};

export default TopSlider;