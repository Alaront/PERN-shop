import React, {useEffect, useState} from 'react';
import TopContent from "../Components/Product/Top/TopContent";
import Description from "../Components/Product/Description/Description";
import ReviewsProduct from "../Components/Product/Description/ReviewsProduct";
import Similar from "../Components/Product/Similar/Similar";
import {useParams} from "react-router";
import {$host} from "../axios";
import {deviceCharacteristicItem, deviceI, deviceInfoI, deviceSimilar} from "../helpers/interfaces";

const Product = () => {
    const {id} = useParams();
    console.log(id)

    const [device, setDevice] = useState<deviceI | null>(null)
    const [deviceCharacteristics, setDeviceCharacteristics] = useState<Array<deviceCharacteristicItem> | null>(null)
    const [deviceInfo, setDeviceInfo] = useState<deviceInfoI | null>(null)
    const [shopTitle, setShopTitle] = useState<string>('')
    const [similar, setSimilar] = useState<Array<deviceSimilar> | null>(null)


    const getProductData = async () => {
        const {data} = await $host.get(`/device/${id}`)
        setDevice(data.device);
        setDeviceCharacteristics(data.deviceCharacteristics);
        setDeviceInfo(data.deviceInfo);
        setShopTitle(data.shopTitle);
        console.log('data', data);

        const response = await $host.get('/device/similar', {
            params: {
                typeId: data.device.typeId,
                brandId: data.device.brandId
            }
        })
        setSimilar(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        getProductData();
    }, [id])


    if (!device || !deviceCharacteristics || !deviceInfo) return <div className={'content product-content'}></div>

    return (
        <div className={'content product-content'}>
            <TopContent device={device} deviceCharacteristics={deviceCharacteristics} deviceInfo={deviceInfo} shopTitle={shopTitle}/>
            <Description descriptionInfo={deviceInfo.text} deviceCharacteristics={deviceCharacteristics}/>
            <ReviewsProduct />
            {
                similar && <Similar allSimilar={similar}/>
            }
        </div>
    );
};

export default Product;