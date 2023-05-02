import React, {FormEvent, useState} from 'react';
import user from "../../../../images/products/user.png";
import {$authHost} from "../../../../axios";
import QuestionForm from "./QuestionForm";
import {deviceQuestionI, questionAnswersI} from "../../../../helpers/interfaces";

interface QuestionItemI {
    questionItem: deviceQuestionI | questionAnswersI
}

const QuestionItem = ({questionItem}:QuestionItemI) => {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [textAnswer, setTextAnswer] = useState<String>('')

    console.log(questionItem['questionAnswers'])
    if(typeof questionItem ) {

    }

    return (
        <div className={'questions-item product-text-item'}>
            <div className={'product-text-item__user-data'}>
                <div className={'product-text-item__user-photo'}>
                    <img src={user} alt={'name'}/>
                </div>
                <p className={'product-text-item__name'}>
                    {
                        questionItem.user.name
                    }
                </p>
            </div>

            <div className={'product-text-item__text'}>
                <p className={'product-text-item__text'}>{questionItem.text}</p>
            </div>

            <p className={'product-text-item__answer'} onClick={() => setShowForm(!showForm)}>{showForm ? 'Скрыть форму' : 'Ответить'}</p>
            <QuestionForm showForm={showForm} type={'answer'} questionId={questionItem.id}/>
            {
                questionItem['questionAnswers'] && questionItem.questionAnswers.map(item => <QuestionItem questionItem={item} key={item.id}/>)
            }
            <hr />
        </div>
    );
};

export default QuestionItem;