import React, {FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import '../styles/addProduct.sass'
import SimpleMdeReact from "react-simplemde-editor";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ChoosePopup from "../Components/choosePopup/choosePopup";
import ok from "../images/decor/ok.svg"
import {$authHost, $host} from "../axios";
import jwtDecode from "jwt-decode";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";

interface photoItemI {
    id: number,
    data: FileList
}

interface allTypeI {
    id: number,
    name: string,
}

interface characteristicsI {
    id: number,
    title: string,
    description: string
}

const EditProduct = () => {
    const [title, setTitle] = useState<string |  null>(null)
    const [type, setType] = useState<number | null>(null)
    const [price, setPrice] = useState<number | null>(null)
    const [count, setCount] = useState<number | null>(null)
    const [discount, setDiscount] = useState<number | null>(null)
    const [brand, setBrand] = useState<number | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [formDisabled, setFormDisabled] = useState<boolean>(false)

    const [showTypePopup, setShowTypePopup] = useState<boolean>(false);
    const [showBrandPopup, setShowBrandPopup] = useState<boolean>(false);

    const [allType, setAllType] = useState<Array<allTypeI>>([]);
    const [allBrands, setAllBrands] = useState<Array<allTypeI>>([]);

    const [titleError, setTitleError] = useState<boolean>(false);
    const [typeError, setTypeError] = useState<boolean>(false);
    const [brandError, setBrandError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    // @ts-ignore
    const {user} = useSelector(state => state.user);
    const {id} = useParams();

    const navigate = useNavigate();

    const formSubmit = async (e:FormEvent) => {
        e.preventDefault()

        if(!title) {
            setTitleError(true);
            return
        }

        if(!type) {
            setTypeError(true);
            return
        }

        if(!brand) {
            setBrandError(true);
            return
        }

        if(!description) {
            setDescriptionError(true);
            return
        }

        if(!id) {
            return
        }


        const titleErrorStatus:boolean = Boolean(title.length <= 0)
        const typeErrorStatus:boolean = type <= 0
        const brandErrorStatus:boolean = brand <= 0
        const descriptionErrorStatus:boolean = Boolean(description.length <= 0)

        setTitleError(titleErrorStatus);
        setTypeError(typeErrorStatus);
        setBrandError(brandErrorStatus);
        setDescriptionError(descriptionErrorStatus)

        console.log(user)

        if(titleErrorStatus || typeErrorStatus || brandErrorStatus || descriptionErrorStatus ) return

        const formData = new FormData();
        formData.append('id', id);
        formData.append('deviceId', id);
        formData.append('userId', user.id);
        formData.append('price', String(price));
        formData.append('discount',  String(discount));
        formData.append('count',  String(count));
        formData.append('typeId', String(type))
        formData.append('brandId', String(brand))
        formData.append('fullName', title)
        formData.append('text', description)
        formData.append('rating', '0')

        setFormDisabled(true)

        try {
            const {data} = await $authHost.patch('/device', formData)
            alert('Товар был обновлен успешно')

            console.log(data)
            window.location.reload();
        } catch (e) {
            console.log(e)
            alert(e)
        }

        setFormDisabled(false)

    }

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

    const onChange = useCallback((value:string) => {
        setDescription(value)
    }, [])

    const getProductData = async () => {
        const {data} = await $host.get(`/device/${id}`)

        setBrand(data.device.brandId)
        setType(data.device.typeId)
        setDescription(data.deviceInfo.text)
        setTitle(data.deviceInfo.fullName)
        setPrice(data.device.price)
        setCount(data.device.count)
        setDiscount(data.device.discount)

        console.log('data', data);

    }

    useEffect(() => {

        $host.get('/brand')
            .then(response => {
                setAllBrands(response.data)
            })

        $host.get('/type')
            .then(response => {
                setAllType(response.data)
            })

        getProductData();
        document.title = 'Edit product';
    }, [])



    if (title === null || type === null || price === null || count === null || discount === null || brand === null || description === null) return <div className={'content product-content'}></div>


    // @ts-ignore
    return (
        <div className={'content add-product'}>
            <h4 className={'add-product__title'}>Редактировать товар</h4>
            <form className={'add-product__form'} onSubmit={formSubmit}>
                <div className={'add-product__form-title'}>
                    <span className={'add-product__form-name'}>Название товара *</span>
                    <input type={'text'} value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    <span className={`add-product__form-error ${titleError ? 'add-product__form--error' : ''}`}>Введите корректное название продукта</span>
                </div>

                <div className={'add-product__form-count'}>
                    <span className={'add-product__form-name'}>Кол-во товара в наличии</span>
                    <input type={'number'} value={count} onChange={(e) => {setCount(Number(e.target.value))}} />
                </div>

                <div className={'add-product__form-price'}>
                    <span className={'add-product__form-name'}>Цена товара(без скидки)</span>
                    <input type={'number'} value={price} onChange={(e) => {setPrice(Number(e.target.value))}} />
                </div>

                <div className={'add-product__form-price'}>
                    <span className={'add-product__form-name'}>Скидка на товар (%)</span>
                    <input type={'number'} value={discount} onChange={(e) => {setDiscount(Number(e.target.value) <= 99 ? Number(e.target.value) : 99)}} />
                </div>

                <div className={'add-product__form-type'}>
                    <p className={'add-product__form-name'}>Выберите тип продукта *</p>
                    { showTypePopup &&
                        <ChoosePopup title={'Выбрать тип'} data={allType} change={(id: number) => setType(id)} choose={type} closePopup={() => setShowTypePopup(false)}/>
                    }
                    <span>Тип: { allType.map(item => {
                        if(item.id === type) return item.name
                    }) }</span>
                    <span className={`add-product__form-error ${typeError ? 'add-product__form--error' : ''}`}>Нужно выбрать тип продукта</span>
                    <div className={'add-product__form-btn-modal'} onClick={() => setShowTypePopup(true)}>Выбрать тип</div>
                </div>

                <div className={'add-product__form-brand'}>
                    <p className={'add-product__form-name'}>Выберите бренд продукта *</p>
                    { showBrandPopup &&
                        <ChoosePopup title={'Выбрать бренд'} data={allBrands} change={(id: number) => setBrand(id)} choose={brand} closePopup={() => setShowBrandPopup(false)}/>
                    }
                    <span>Тип: { allBrands.map(item => {
                        if(item.id === brand) return item.name
                    }) }</span>
                    <span className={`add-product__form-error ${brandError ? 'add-product__form--error' : ''}`}>Нужно выбрать бренд продукта</span>
                    <div className={'add-product__form-btn-modal'} onClick={() => setShowBrandPopup(true)}>Выбрать бренд</div>
                </div>

                <div className={'add-product__form-description'}>
                    <span className={'add-product__form-name'}>Описание продукта *</span>
                    <SimpleMdeReact value={description} onChange={onChange} options={editorOptions}/>
                    <span className={`add-product__form-error ${descriptionError ? 'add-product__form--error' : ''}`}>Нужно составить описание продукта</span>
                </div>


                <hr />

                <button className={'add-product__form-btn'} disabled={formDisabled}>Редактировать товар</button>
            </form>
        </div>
    );
};

export default EditProduct;