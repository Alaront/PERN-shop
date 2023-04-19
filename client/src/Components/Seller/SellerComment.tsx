import React from 'react';
import watchPhoto from "../../images/products/watch.png";

import './index.sass'
import GradeStars from "../Grade/GradeStars";

const SellerComment = () => {
    return (
        <div className={'seller-comment'}>
            <div className={'seller-comment__user'}>
                <div className={'seller-comment__user-photo'}>
                    <img src={watchPhoto} alt={'photo'} />
                </div>
                <p className={'seller-comment__user-name'}>Alex Den</p>
            </div>
            <div className={'seller-comment__data'}>
                <GradeStars grade={4} />
                <span>20 Февраля 2023</span>
            </div>
            <div className={"seller-comment__text"}>
                Конфеты точно как Баунти, приятный аналог без сахара и вредностей. Много начинки и тооонкий слой шоколада. Любителям кокоса идеально! В коробке 12 штучек, каждая отдельно упакована. Сама коробка очень красивая и оригинальная, можно и в подарок.
            </div>
        </div>
    );
};

export default SellerComment;