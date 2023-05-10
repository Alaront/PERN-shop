import React, {useEffect, useState} from 'react';
import watchPhoto from "../../images/products/watch.png";

import './index.sass'
import {$host} from "../../axios";
import {useParams} from "react-router";
import {makeFullPhotoUrl} from "../../helpers";
import ReactMarkdown from "react-markdown";

interface shopDataI {
    img: string,
    title: string,
    description: string,
    email: string,
    phone: string,
    country: string,
}

const SellerAbout = () => {
    const [shopData, setShopData] = useState<shopDataI | null>(null)

    const {id} = useParams();

    useEffect(() => {
        $host.get(`/userShop/${id}`)
            .then(response => {
                setShopData(response.data ? response.data : {})
            })
    }, [])

    useEffect(() => {
        if(shopData?.title) {
            document.title = shopData.title
        }

    }, [shopData])


    if(!shopData) {
        return <></>
    }

    return (
        <div className={'seller-about'}>
            <div className={'seller-about__photo'}>
                <img src={makeFullPhotoUrl(shopData.img)} alt={'photo'} />
            </div>
            <div className={'seller-about__text'} >
                <h2 className={'seller-about__title'}>{shopData.title}</h2>
                <div>
                    <ReactMarkdown children={shopData.description} />
                </div>
                <ul className={'seller-about__info-list'}>
                    <li className={'seller-about__info-list--email'}><span>Email: </span>{shopData.email}</li>
                    <li className={'seller-about__info-list--phone'}><span>Телефон: </span>{shopData.phone}</li>
                    <li className={'seller-about__info-list--country'}><span>Страна: </span>{shopData.country}</li>
                </ul>
            </div>
        </div>
    );
};

export default SellerAbout;