import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {$host} from "../../axios";
import {deviceCartI} from "../../helpers/interfaces";
import ProductCartShort from "../Products/ProductCartShort";

const SellerDevices = () => {
    const [devices, setDevices] = useState<Array<deviceCartI>>()

    const {id} = useParams();

    const getData = async () => {
        const params = {
            shopId: id
        }

        const {data} = await $host.post('/device/getDevicesByShop', params)
        console.log(data)
        setDevices(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={'seller-devices'}>
            {
                devices && devices.map(item => <ProductCartShort key={item.id} title={item.deviceInfo?.fullName} photoUrl={item.deviceInfo.mainPhoto} price={item.price} discount={item.discount} hrefLink={String(item.id)} />)
            }
        </div>
    );
};

export default SellerDevices;

