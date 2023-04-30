import React, {FormEvent, useState} from 'react';
import user from "../../../images/products/user.png";
import {reviewCommentItem} from "../../../helpers/interfaces";
import {$authHost} from "../../../axios";

interface ReviewsAnswerI {
    commentItem: reviewCommentItem,
    id: number
}

const ReviewsAnswer = ({commentItem, id}:ReviewsAnswerI) => {
    const [showForm, setShowForm] = useState<boolean>(false)

    const [textAnswer, setTextAnswer] = useState<String>('')

    const sendFormReviews = async (e:FormEvent) => {
        e.preventDefault();

        const params = {
            text: textAnswer,
            reviewId: id
        }

        const {data} = await $authHost.post('/review/reviewComment', params);
        console.log(id, data);
        alert('Ваш ответ был добавлен')
        setTextAnswer('')
        setShowForm(false)
    }

    return (
        <div className={'reviews-answer reviews-item'}>
            <div className={'reviews-item__user-data'}>
                <div className={'reviews-item__user-photo'}>
                    <img src={user} alt={'name'}/>
                </div>
                <p className={'reviews-item__name'}>
                    {
                        commentItem.name
                    }
                </p>
            </div>

            <div className={'reviews-item__text'}>
                <p className={'reviews-item__text'}>{commentItem.text}</p>
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