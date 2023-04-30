import React, {FormEvent, useState} from 'react';
import user from "../../../images/products/user.png";
import GradeStars from "../../Grade/GradeStars";
import ReviewsAnswer from "./ReviewsAnswer";
import {reviewsItem} from "../../../helpers/interfaces";
import {$authHost} from "../../../axios";

interface reviewsItemI {
    item: reviewsItem,
    id: number
}

const ReviewsItem = ({item, id}: reviewsItemI) => {
    const [showForm, setShowForm] = useState<boolean>(false)

    const [textAnswer, setTextAnswer] = useState<String>('')

    const sendFormReviews = async (e:FormEvent) => {
        e.preventDefault();

        try {
            if(!textAnswer) return

            const params = {
                text: textAnswer,
                reviewId: id
            }

            const {data} = await $authHost.post('/review/reviewComment', params);
            console.log(id, data);
            alert('Ваш комментарий был добавлен')
            setTextAnswer('')
            setShowForm(false)

        } catch (e) {
            console.log(e)
        }

        console.log('textAnswer', textAnswer)
    }


    return (
        <div className={'reviews-item'}>
            <div className={'reviews-item__user'}>
                <div className={'reviews-item__user-data'}>
                    <div className={'reviews-item__user-photo'}>
                        <img src={user} alt={'name'}/>
                    </div>
                    <p className={'reviews-item__name'}>
                        {item.user.name}
                    </p>
                </div>
                <div className={'reviews-item__stars'}>
                    <GradeStars grade={item.rating} />
                    <p className={'reviews-item__date'}>{item.updatedAt}</p>
                </div>
            </div>

            <div className={'reviews-item__text'}>
                <p className={'reviews-item__subtitle'}>Достоинства</p>
                <p className={'reviews-item__text'}>{item.positive}</p>
                <p className={'reviews-item__subtitle'}>Недостатки</p>
                <p className={'reviews-item__text'}>{item.negative}</p>
                <p className={'reviews-item__subtitle'}>Комментарий</p>
                <p className={'reviews-item__text'}>{item.text}</p>
            </div>

            <p className={'reviews-item__answer'} onClick={() => setShowForm(!showForm)}>{showForm ? 'Скрыть форму' : 'Ответить'}</p>

            {
                item.reviewComments && item.reviewComments.map(commentItem => <ReviewsAnswer key={commentItem.id} id={id} commentItem={commentItem}/>)
            }

            <form className={`reviews-item__answer-form ${showForm ? '' : 'reviews-item__answer-form--hidden'}`} onSubmit={sendFormReviews}>
                <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextAnswer(e.target.value)} />
                <button>Отправить ответ на отзыв</button>
            </form>
        </div>
    );
};

export default ReviewsItem;