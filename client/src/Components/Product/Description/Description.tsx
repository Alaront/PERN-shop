import React, {useState} from 'react';

import './index.sass'
import Characteristics from "./Characteristics";
import DescriptionInfoBlock from "./DescriptionInfo";
import {deviceCharacteristicItem} from "../../../helpers/interfaces";
// Смартфон HUAWEI nova 10 SE обладает безрамочным OLED-дисплеем HUAWEI FullView 6,67 дюйма с частотой обновления 90 Гц и частотой дискретизации касаний 270 Гц. Благодаря цветовому охвату P3 контент на экране телефоны выглядит реалистично. Полезная площадь устройства составляет 91,85%, но это никак не виляет на энергоэффективность смартфона: батарея 4500 мА*ч поддерживает функцию умного управления энергопотреблением, обеспечивая 12 часов работы в режиме воспроизведения видео всего на одной полной зарядке. HUAWEI nova 10 SE также поддерживает технологию HUAWEI SuperCharge 66 Вт, которая позволяет полностью зарядить устройство всего за 38 минут. Снимайте захватывающие портреты благодаря портретному модулю с высоким разрешением 108 МП, а с помощью алгоритма объединения кадров в формате RAW повышайте качество ваших изображений. Для хранения фотографий телефон оснащен 128 ГБ встроенной памяти. HUAWEI nova 10 SE имеет NFC-модуль, а также поддерживает функцию «Суперустройство», которая позволяет мгновенное подключать смартфон к устройствам Vision, наушникам и носимым устройствам.

interface Description {
    descriptionInfo: string,
    deviceCharacteristics: Array<deviceCharacteristicItem>
}

const Description = ({descriptionInfo, deviceCharacteristics}: Description) => {

    return (
        <div className={'description-product'}>
            <div className={'description-product__wrapper'}>
                <DescriptionInfoBlock descriptionInfo={descriptionInfo} />
                <Characteristics listCharacteristics={deviceCharacteristics}/>
            </div>
        </div>
    );
};

export default Description;