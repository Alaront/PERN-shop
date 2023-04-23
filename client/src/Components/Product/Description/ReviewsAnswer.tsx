import React, {FormEvent, useState} from 'react';
import watchPhoto from "../../../images/products/watch.png";

const ReviewsAnswer = () => {
    const [showForm, setShowForm] = useState<boolean>(false)

    const [textAnswer, setTextAnswer] = useState<String>('')

    const sendFormReviews = (e:FormEvent) => {
        e.preventDefault();
        console.log('textAnswer', textAnswer)
    }

    return (
        <div className={'reviews-answer reviews-item'}>
            <div className={'reviews-item__user-data'}>
                <div className={'reviews-item__user-photo'}>
                    <img src={watchPhoto} alt={'name'}/>
                </div>
                <p className={'reviews-item__name'}>
                    Алена В.
                </p>
            </div>

            <div className={'reviews-item__text'}>
                <p className={'reviews-item__text'}>Конфеты точно как Баунти, приятный аналог без сахара и вредностей. Много начинки и тооонкий слой шоколада. Любителям кокоса идеально! В коробке 12 штучек, каждая отдельно упакована. Сама коробка очень красивая и оригинальная, можно и в подарок. </p>
            </div>

            <p className={'reviews-item__answer'} onClick={() => setShowForm(!showForm)}>{showForm ? 'Скрыть форму' : 'Ответить'}</p>

            <form className={`reviews-item__answer-form ${showForm ? '' : 'reviews-item__answer-form--hidden'}`} onSubmit={sendFormReviews}>
                <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextAnswer(e.target.value)} />
                <button>Отправить ответ на комментарий</button>
            </form>
        </div>
    );
};

export default ReviewsAnswer;