import React, {FormEvent, useState} from 'react';
import user from "../../../../images/products/user.png";
import GradeStars from "../../../Grade/GradeStars";
import ReviewsAnswer from "./ReviewsAnswer";
import {reviewsItem} from "../../../../helpers/interfaces";
import {$authHost} from "../../../../axios";
import {makeDataFormat} from "../../../../helpers";

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
        <div className={'product-text-item'}>
            <div className={'product-text-item__user'}>
                <div className={'product-text-item__user-data'}>
                    <div className={'product-text-item__user-photo'}>
                        <img src={user} alt={'name'}/>
                    </div>
                    <p className={'product-text-item__name'}>
                        {item.user.name}
                    </p>
                </div>
                <div className={'product-text-item__stars'}>
                    <GradeStars grade={item.rating} />
                    <p className={'product-text-item__date'}>{makeDataFormat(item.updatedAt)}</p>
                </div>
            </div>

            <div className={'product-text-item__text'}>
                <p className={'product-text-item__subtitle'}>Достоинства</p>
                <p className={'product-text-item__text'}>{item.positive}</p>
                <p className={'product-text-item__subtitle'}>Недостатки</p>
                <p className={'product-text-item__text'}>{item.negative}</p>
                <p className={'product-text-item__subtitle'}>Комментарий</p>
                <p className={'product-text-item__text'}>{item.text}</p>
            </div>

            <p className={'product-text-item__answer'} onClick={() => setShowForm(!showForm)}>{showForm ? 'Скрыть форму' : 'Ответить'}</p>

            {
                item.reviewComments && item.reviewComments.map(commentItem => <ReviewsAnswer key={commentItem.id} id={id} commentItem={commentItem}/>)
            }

            <form className={`product-text-item__answer-form ${showForm ? '' : 'product-text-item__answer-form--hidden'}`} onSubmit={sendFormReviews}>
                <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextAnswer(e.target.value)} />
                <button>Отправить ответ на отзыв</button>
            </form>
            <hr />
        </div>
    );
};

export default ReviewsItem;