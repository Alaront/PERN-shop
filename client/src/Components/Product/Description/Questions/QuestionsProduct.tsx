import React, {useState} from 'react';

import '../index.sass';
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";
import {deviceQuestionI} from "../../../../helpers/interfaces";

interface QuestionProductI {
    deviceQuestion: Array<deviceQuestionI>
}

const QuestionsProduct = ({deviceQuestion}:QuestionProductI) => {

    return (
        <div className={'questions-product'}>
            <p className={'questions-product__title'}>Вопросы и ответы</p>
            <div className={'questions-product__form-block'}>
                <p className={'questions-product__title'}>Вы можете задать свой вопрос</p>
                <QuestionForm showForm={true} type={"question"}/>
            </div>
            <div className={'questions-product__wrapper'}>
                {
                    deviceQuestion && deviceQuestion.map(item => <QuestionItem questionItem={item} key={item.id}/>)
                }
            </div>
        </div>
    );
};

export default QuestionsProduct;