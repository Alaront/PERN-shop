import React, {ImgHTMLAttributes} from 'react';
import {makeFullPhotoUrl} from "../../helpers";
import {NavLink} from "react-router-dom";

interface sliderProps {
    title: string,
    discount: number,
    photo: string,
    linkHref: string
}

const DailySlide = ({discount, photo, title, linkHref}: sliderProps) => {
    return (
        <h4 className={'deals-slider__item'}>
            <div className={'deals-slider__photo'}>
                <img src={makeFullPhotoUrl(photo)} alt={title}/>
            </div>
            <NavLink to={`product/${linkHref}`}>{title}</NavLink>
            <span>{discount}%</span>
        </h4>
    );
};

export default DailySlide;