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
    const [shopData, setShopData] = useState<shopDataI | {}>({})

    const {id} = useParams();

    useEffect(() => {
        $host.get(`/userShop/${id}`)
            .then(response => {
                setShopData(response.data ? response.data : {})
            })
    }, [])

    if(!Object.keys(shopData).length) return <></>

    return (
        <div className={'seller-about'}>
            <div className={'seller-about__photo'}>
                <img src={"img" in shopData ? makeFullPhotoUrl(shopData.img) : ''} alt={'photo'} />
            </div>
            <div className={'seller-about__text'} >
                <h2 className={'seller-about__title'}>{"title" in shopData ? shopData.title : ''}</h2>
                <div>
                    <ReactMarkdown children={"description" in shopData ? shopData.description : ''} />
                </div>
                <ul className={'seller-about__info-list'}>
                    <li className={'seller-about__info-list--email'}><span>Email: </span>{"email" in shopData ? shopData.email : ''}</li>
                    <li className={'seller-about__info-list--phone'}><span>Телефон: </span>{"phone" in shopData ? shopData.phone : ''}</li>
                    <li className={'seller-about__info-list--country'}><span>Страна: </span>{"country" in shopData ? shopData.country : ''}</li>
                </ul>
            </div>
        </div>
    );
};

export default SellerAbout;