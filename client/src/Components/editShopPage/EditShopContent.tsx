import React, {FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import ok from "../../images/decor/ok.svg";
import {makeFullPhotoUrl} from "../../helpers";
import {$authHost} from "../../axios";
import SimpleMdeReact from "react-simplemde-editor";
import SimpleMDE from "react-simplemde-editor";
import {useParams} from "react-router";

const EditShopContent = () => {
    const [title, setTitle] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const {id} = useParams();

    const onChange = useCallback((value:string) => {
        setDescription(value)
    }, [])

    const editorOptions = useMemo(() => {
        return {
            spellChecker: false,
            maxHeight: "400px",
            autofocus: true,
            placeholder: "Введите текст...",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            }
            // @ts-ignore
        } as SimpleMDE.Options
    }, [])

    const formSubmit = async (e:FormEvent) => {
        e.preventDefault()

        if(!id) return

        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('country',  country);

        try {
            const {data} = await $authHost.patch('/userShop', formData)
            alert('Страница была обновлена успешно')

            console.log(data)
            window.location.reload();
        } catch (e) {
            console.log(e)
            alert(e)
        }

    }

    const getData = async () => {
        const {data} = await $authHost.get(`/userShop/${id}`);
        console.log(data)
        setTitle(data.title);
        setEmail(data.email);
        setCountry(data.country);
        setPhone(data.phone);
        setDescription(data.description);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <h4 className={'add-product__title'}>{'Редактировать страницу магазина'}</h4>
            <form className={'add-product__form'} onSubmit={formSubmit}>
                <div className={'add-product__form-title'}>
                    <span className={'add-product__form-name'}>Название</span>
                    <input type={'text'} value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </div>

                <div className={'add-product__form-email'}>
                    <span className={'add-product__form-name'}>Email</span>
                    <input type={'text'} value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </div>

                <div className={'add-product__form-country'}>
                    <span className={'add-product__form-name'}>Country</span>
                    <input type={'text'} value={country} onChange={(e) => {setCountry(e.target.value)}} />
                </div>


                <div className={'add-product__form-phone'}>
                    <span className={'add-product__form-name'}>Phone</span>
                    <input type={'text'} value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                </div>

                <div className={'add-product__form-description'}>
                    <span className={'add-product__form-name'}>Описание Магазина</span>
                    <SimpleMdeReact value={description} onChange={onChange} options={editorOptions}/>
                </div>
                <button className={'add-product__form-btn'}>Отправить</button>
            </form>
        </>
    );
};

export default EditShopContent;