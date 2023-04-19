import React, {ImgHTMLAttributes} from 'react';

interface sliderProps {
    title: string,
    discount: number,
    photo: string,
    linkHref: string
}

const DailySlide = ({discount, photo, title, linkHref}: sliderProps) => {
    return (
        <a className={'deals-slider__item'} href={linkHref}>
            <div className={'deals-slider__photo'}>
                <img src={photo} alt={title}/>
            </div>
            <h4>{title}</h4>
            <span>{discount}%</span>
        </a>
    );
};

export default DailySlide;