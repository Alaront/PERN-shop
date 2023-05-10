import React, {useEffect, useState} from 'react';
import TopContent from "../Components/Product/Top/TopContent";
import Description from "../Components/Product/Description/Description";
import ReviewsProduct from "../Components/Product/Description/Reviews/ReviewsProduct";
import Similar from "../Components/Product/Similar/Similar";
import {useParams} from "react-router";
import {$host} from "../axios";
import {
    deviceCharacteristicItem,
    deviceI,
    deviceInfoI,
    devicePhotosItem, deviceQuestionI,
    deviceSimilar,
    reviewsItem
} from "../helpers/interfaces";
import QuestionsProduct from "../Components/Product/Description/Questions/QuestionsProduct";
import {writeLSProductCheck} from "../helpers";

const Product = () => {
    const {id} = useParams();
    console.log(id)

    const [device, setDevice] = useState<deviceI | null>(null)
    const [deviceCharacteristics, setDeviceCharacteristics] = useState<Array<deviceCharacteristicItem> | null>(null)
    const [deviceInfo, setDeviceInfo] = useState<deviceInfoI | null>(null)
    const [devicePhotos, setDevicePhotos] = useState<Array<devicePhotosItem> | null>(null)
    const [deviceReviews, setDeviceReviews] = useState<Array<reviewsItem> | []>([])
    const [deviceQuestion, setDeviceQuestion] = useState<Array<deviceQuestionI> | []>([])
    const [shopTitle, setShopTitle] = useState<string>('')
    const [similar, setSimilar] = useState<Array<deviceSimilar> | null>(null)
    const [showReviews, setShowReviews] = useState<boolean>(true)


    const getProductData = async () => {
        const {data} = await $host.get(`/device/${id}`)
        setDevice(data.device);
        setDeviceCharacteristics(data.deviceCharacteristics);
        setDeviceInfo(data.deviceInfo);
        setShopTitle(data.shopTitle);
        setDevicePhotos(data.devicePhotos);
        setDeviceReviews(data.deviceReviews);
        setDeviceQuestion(data.deviceQuestions);
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
        if(id) {
            writeLSProductCheck(Number(id))
        }
        window.scrollTo(0, 0);
    }, [id])

    useEffect(() => {
        console.log(deviceInfo)

        if(deviceInfo?.fullName) {
            document.title = deviceInfo.fullName
        }
    }, [deviceInfo])

    if (!device || !deviceCharacteristics || !deviceInfo || !devicePhotos || !deviceQuestion) return <div className={'content product-content'}></div>

    return (
        <div className={'content product-content'}>
            <TopContent device={device} deviceCharacteristics={deviceCharacteristics} deviceInfo={deviceInfo} shopTitle={shopTitle} devicePhotos={devicePhotos}/>
            <Description descriptionInfo={deviceInfo.text} deviceCharacteristics={deviceCharacteristics}/>

            {
                showReviews ?
                    <ReviewsProduct deviceReviews={deviceReviews} >
                    <>
                        {
                            showReviews ? <p className={'btn-change-reviews'} onClick={() => setShowReviews(false)}>Показать вопросы</p> : <p className={'btn-change-reviews'} onClick={() => setShowReviews(true)}>Показать отзывы</p>
                        }
                    </>
                </ReviewsProduct>
                :  <QuestionsProduct deviceQuestion={deviceQuestion}>
                        <>
                            {
                                showReviews ? <p className={'btn-change-reviews'} onClick={() => setShowReviews(false)}>Показать вопросы</p> : <p className={'btn-change-reviews'} onClick={() => setShowReviews(true)}>Показать отзывы</p>
                            }
                        </>
                    </QuestionsProduct>
            }

            {
                similar && <Similar allSimilar={similar}/>
            }
        </div>
    );
};

export default Product;