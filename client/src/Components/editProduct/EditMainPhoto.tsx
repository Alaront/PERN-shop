import React, {FormEvent, useEffect, useState} from 'react';
import ok from "../../images/decor/ok.svg";
import {makeFullPhotoUrl} from "../../helpers";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {$authHost} from "../../axios";

interface EditMainPhotoI {
    type: string,
    title: string
}

const EditMainPhoto = ({title, type}: EditMainPhotoI) => {
    // @ts-ignore
    const {user} = useSelector(state => state.user);
    const {id} = useParams();

    const [photo, setPhoto] = useState<File | string>('');
    const [currentPhoto, setCurrentPhoto] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setPhoto(selectedFile);
        }
    };


    const sendShopPage = async (formData: FormData) => {
        try {
            const {data} = await $authHost.patch('/userShop/photo', formData)
            alert('Фото было обновлено успешно')

            window.location.reload();
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const sendDevice = async (formData: FormData) => {
        try {
            const {data} = await $authHost.patch('/device/photo', formData)
            alert('Фото было обновлено успешно')

            window.location.reload();
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const formSubmit = async (e:FormEvent) => {
        e.preventDefault();

        if(!id || !photo) return

        if(type === 'shopPage') {
            const formData: FormData = new FormData();
            formData.append('id', id);
            formData.append('photo', photo);
            formData.append('userId', user.id);
            sendShopPage(formData)
        } else {
            const formData: FormData = new FormData();
            formData.append('deviceId', id);
            formData.append('photo', photo);
            formData.append('userId', user.id);
            sendDevice(formData)
        }

    }

    const getDataDevice = async () => {
        const {data} = await $authHost.get(`/device/${id}`)
        setCurrentPhoto(data.deviceInfo?.mainPhoto)
        console.log('test', data)
    }

    const getDataShop = async () => {
        const {data} = await $authHost.get(`/userShop/${id}`)
        setCurrentPhoto(data.img)
        console.log('test', data)
    }

    useEffect(() => {

        if(type === 'shopPage') {
            getDataShop();
        } else {
            getDataDevice();
        }

    }, [])

    return (
        <>
            <h4 className={'add-product__title'}>{title}</h4>
            <form className={'add-product__form'} onSubmit={formSubmit}>
                <div className={'add-product__form-photo'}>
                    <span className={'add-product__form-name'}>Выберите главное фото продукта</span>
                    <label className="input-file">
                        <input type="file" accept={"image/*"} onChange={handleFileChange} />
                        <span className="input-file-btn">Выберите файл</span>
                        <span>Выберите файл</span>
                        { photo && <img src={ok} alt={'photo'}/> }
                    </label>
                    { currentPhoto && <img src={makeFullPhotoUrl(currentPhoto)} alt={'photo'}/> }
                </div>
                <button className={'add-product__form-btn'}>Отправить новое главное фото</button>
            </form>
        </>
    );
};

export default EditMainPhoto;