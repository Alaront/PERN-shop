import React from 'react';
import watchPhoto from "../../../images/products/watch.png";
import GradeStars from "../../Grade/GradeStars";

const ReviewsItem = () => {
    return (
        <div className={'reviews-item'}>
            <div className={'reviews-item__user'}>
                <div className={'reviews-item__user-data'}>
                    <div className={'reviews-item__user-photo'}>
                        <img src={watchPhoto} alt={'name'}/>
                    </div>
                    <p className={'reviews-item__name'}>
                        Алена В.
                    </p>
                </div>
                <div className={'reviews-item__stars'}>
                    <GradeStars grade={3} />
                    <p className={'reviews-item__date'}>20 Февраля 2023</p>
                </div>
            </div>

            <div className={'reviews-item__text'}>
                <p className={'reviews-item__subtitle'}>Достоинства</p>
                <p className={'reviews-item__text'}>Вкусные, без сахара, к тому же в индивидуальной упаковке каждая конфета</p>
                <p className={'reviews-item__subtitle'}>Недостатки</p>
                <p className={'reviews-item__text'}>Нет</p>
                <p className={'reviews-item__subtitle'}>Комментарий</p>
                <p className={'reviews-item__text'}>Конфеты точно как Баунти, приятный аналог без сахара и вредностей. Много начинки и тооонкий слой шоколада. Любителям кокоса идеально! В коробке 12 штучек, каждая отдельно упакована. Сама коробка очень красивая и оригинальная, можно и в подарок. </p>

            </div>
        </div>
    );
};

export default ReviewsItem;