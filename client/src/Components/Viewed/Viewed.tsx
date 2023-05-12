import React, {useEffect, useState} from 'react';
import ProductCartShort from "../Products/ProductCartShort";

import './index.sass';
import {deviceCartI} from "../../helpers/interfaces";
import {$host} from "../../axios";
import {readLSProductCheck} from "../../helpers";

const Viewed = () => {
    const [data, setData] = useState<Array<deviceCartI>>([]);

    const getData = async() => {
        const id:Array<number> = readLSProductCheck();

        if(!id) return

        const params = {
            allId: id
        }

        const {data} = await $host.post('/device/getDevicesById', params);
        console.log(data)
        setData(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={'viewed'}>
            <p className={'viewed__title'}>Вы смотрели</p>
            <div className={'viewed__wrapper-card'}>
                {
                    data && data.map(item => <ProductCartShort key={item.id} title={item.deviceInfo?.fullName} photoUrl={item.deviceInfo?.mainPhoto} price={item.price} discount={item.discount} hrefLink={String(item.id)} />)
                }
            </div>
        </div>
    );
};

export default Viewed;