import React, {FormEvent, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import ok from "../../images/decor/ok.svg";
import {makeFullPhotoUrl} from "../../helpers";
import {$authHost} from "../../axios";

interface photoItemI {
    id: number,
    deviceId: number,
    url: string,
}

const EditDifferentPhoto = () => {
    // @ts-ignore
    const {user} = useSelector(state => state.user);
    const {id} = useParams();

    const [allPhotos, setAllPhotos] = useState<Array<photoItemI>>([])
    const [photo, setPhoto] = useState<File | null>(null);

    const formSubmit = async (e:FormEvent) => {
        e.preventDefault();

        if(!id || !photo) return

        try {
            const formData = new FormData();
            formData.append('deviceId', id);
            formData.append('photo', photo);

            const {data} = await $authHost.post('/device/addPhoto', formData)
            console.log('data', data)
            window.location.reload();
        } catch (e) {
            alert(e)
            console.log(e)
        }
    }

    const getData = async() => {
        const {data} = await $authHost.get(`/device/${id}`)

        console.log('data', data)

        setAllPhotos(data.devicePhotos)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setPhoto(selectedFile);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <form className={'add-product__form add-product__form-photo'} onSubmit={formSubmit}>
                <span className={'add-product__form-name'}>Добавить новые фото</span>
                <label className="input-file">
                    <input type="file" accept={"image/*"} onChange={handleFileChange} />
                    <span className="input-file-btn">Выберите файл</span>
                    <span>Выберите файл</span>
                    { photo && <img src={ok} alt={'photo'}/> }
                </label>
                {
                    allPhotos && allPhotos.map(item => <img key={item.id} src={makeFullPhotoUrl(item.url)} alt={String(item.id)}/>)
                }

                <div className={'add-product__form-photo'}>

                </div>
                <button className={'add-product__form-btn'}>Отправить новое фото</button>
            </form>
        </>
    );
};

export default EditDifferentPhoto;