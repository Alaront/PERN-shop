import React, {FormEvent, useState} from 'react';
import '../../Grade/index.sass'

interface reviewsForm {
    closeForm: Function
}

const ReviewsForm = ({closeForm}:reviewsForm) => {
    const [advantages, setAdvantages] = useState<String>('')
    const [disadvantages, setDisadvantages] = useState<String>('')
    const [comments, setComments] = useState<String>('')

    const [grade, setGrade] = useState<Number>(2);


    const pushForm = (e:FormEvent) => {
        e.preventDefault();

        console.log(advantages, disadvantages, comments)
    }

    return (
        <div className={'reviews-form'}>
            <div className={'reviews-form__wrapper'}>
                <p className={'reviews-form__title'}>Оставить отзыв</p>
                <form onSubmit={pushForm} className={'reviews-form__form'}>
                    <div>
                        <p>Достоинства: </p>
                        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdvantages(e.target.value)} />
                    </div>
                    <div>
                        <p>Недостатки: </p>
                        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDisadvantages(e.target.value)} />
                    </div>
                    <div>
                        <p>Комментарий: </p>
                        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComments(e.target.value)} />
                    </div>
                    <div className={'reviews-form__grade grade-stars'}>
                            <>
                                {
                                    [...Array(5)].map((_, index) => <span key={index} className={`${grade >= index + 1 ? 'grade-stars__stars-check' : 'grade-stars__stars-not-check'}`} onMouseOver={() => setGrade(index + 1)}></span>)
                                }
                                Ваша оценка: {grade}
                            </>
                    </div>
                    <button>Отправить</button>
                </form>
                <div className={'reviews-form__close'} onClick={() => closeForm()}></div>
            </div>
        </div>
    );
};

export default ReviewsForm;