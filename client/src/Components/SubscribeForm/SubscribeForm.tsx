import React, {useRef} from 'react';

import './index.sass'

const SubscribeForm = () => {

    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)

    const pushForm = (e:React.FormEvent) => {
        e.preventDefault();

        console.log('Push form', nameRef.current?.value, emailRef.current?.value)

        if(nameRef.current) {
            nameRef.current.value = '';
        }

        if(emailRef.current) {
            emailRef.current.value = '';
        }
    }

    return (
        <div className={'subscribe-form'}>
            <p className={'subscribe-form__title'}>Подпишитесь на новости и обновления</p>
            <form className={'subscribe-form__form'} onSubmit={e => pushForm(e)}>
                <div>
                    <p>Ваше имя</p>
                    <input type={'text'} ref={nameRef} />
                </div>
                <div>
                    <p>Ваша почта</p>
                    <input type={'text'} ref={emailRef}/>
                </div>
                <button>Подписаться</button>
            </form>
        </div>
    );
};

export default SubscribeForm;