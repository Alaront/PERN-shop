import React, {FormEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {$authHost} from "../../../../axios";

interface QuestionFormI {
    showForm: boolean,
    type: 'question' | 'answer',
    questionId?: number
}

interface paramsI {
    text: string,
    deviceId: string,
    userId: string,
    questionId?: number
}

const QuestionForm = ({showForm, type, questionId}:QuestionFormI) => {
    const textInput = React.useRef<HTMLTextAreaElement>(null);

    // @ts-ignore
    const {user} = useSelector(state => state.user);
    const {id} = useParams();

    const sendFormReviews = async (e:FormEvent) => {
        e.preventDefault();

        if(!textInput.current || !id) return

        const puth = type === 'question' ? '/question' : '/question/answer'

        const params:paramsI = {
            text: textInput.current.value,
            deviceId: id,
            userId: user.id,
        }

        if(type !== 'question' && questionId) params['questionId'] = questionId

        const {data} = await $authHost.post(puth, params);
        console.log(id, data);
        alert('Ваш вопрос был добавлен')
        textInput.current.value = ''
    }

    return (
        <form className={`product-text-item__answer-form ${showForm ? '' : 'product-text-item__answer-form--hidden'}`} onSubmit={sendFormReviews}>
            <textarea ref={textInput} />
            <button>Отправить</button>
        </form>
    );
};

export default QuestionForm;