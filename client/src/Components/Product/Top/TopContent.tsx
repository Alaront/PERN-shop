import React, {useState} from 'react';

import './style.sass'
import TopSlider from "./TopSlider";
import Bitmap from '../../../images/products/Bitmap.png'

import TopInfo from "./TopInfo";
import GradeStars from "../../Grade/GradeStars";
import {useParams} from "react-router";
import {deviceCharacteristicItem, deviceI, deviceInfoI} from "../../../helpers/interfaces";
import {NavLink} from "react-router-dom";

export interface typeProduct {
    id: number,
    title: string,
    photoUrl: string
}

interface TopContentI {
    device: deviceI,
    deviceCharacteristics: Array<deviceCharacteristicItem>,
    deviceInfo: deviceInfoI,
    shopTitle: string
}

const TopContent = ({deviceCharacteristics, deviceInfo, device, shopTitle}:TopContentI) => {
    const [grade, setGrade] = useState<number>(4.6);
    const [productTitle, setProductTitle] = useState<string>('Набор электронных компонентов для Arduino R3 UNO R3 в коробке, 830 точек связи');

    return (
        <div className={'top-content'}>
            <h1 className={'top-content__title'}>{deviceInfo.fullName}</h1>
            <div className={'top-content__info-left'}>
                <div className={'top-content__grade'}>
                    <GradeStars grade={deviceInfo.rating} />

                    {deviceInfo.rating}
                </div>
                <span className={'top-content__reviews'}>{device.countSales} купили</span>
                <NavLink to={`/shopPage/${device.userShopId}`} className={'top-content__bought'}>{shopTitle || ''}</NavLink>
            </div>
            <div className={'top-content__info-right'}>
                <TopSlider mainPhoto={deviceInfo.mainPhoto} otherPhotos={[deviceInfo.mainPhoto, deviceInfo.mainPhoto]}/>
                <TopInfo productId={device.id} price={device.price} discount={device.discount} />
            </div>
        </div>
    );
};

export default TopContent;