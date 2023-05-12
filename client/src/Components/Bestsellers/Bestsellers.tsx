import React, {useEffect, useState} from 'react';
import Bitmap from '../../images/products/Bitmap.png'

import './index.sass'
import ProductCartShort from "../Products/ProductCartShort";
import {$host} from "../../axios";
import {deviceCartI} from "../../helpers/interfaces";
const Bestsellers = () => {
    const [device, setDevice] = useState<Array<deviceCartI>>([])

    const getData = async () => {
        const {data} = await $host.get('/device/getDevicesForMain', {
            params: {
                type: 'rating'
            }
        });

        setDevice(data)
    }

    useEffect(() => {

        getData();
    }, [])

    return (
        <div className={'bestsellers'}>
            <h3 className={'bestsellers__title'}>Хиты продаж</h3>
            <div className={'bestsellers__wrapper-card'}>
                {
                    device && device.map(item =>  <ProductCartShort key={item.id} title={item.deviceInfo?.fullName} photoUrl={item.deviceInfo?.mainPhoto} price={item.price} discount={item.discount} hrefLink={String(item.id)} />)
                }
            </div>
        </div>
    );
};

export default Bestsellers;