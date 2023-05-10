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
import {useNavigate} from "react-router";

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

const AddProduct = () => {
    const [title, setTitle] = useState<string>('')
    const [type, setType] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [brand, setBrand] = useState<number>(0)
    const [photo, setPhoto] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('')
    const [characteristics, setCharacteristics] = useState<Array<characteristicsI>>([])

    const [showTypePopup, setShowTypePopup] = useState<boolean>(false);
    const [showBrandPopup, setShowBrandPopup] = useState<boolean>(false);

    const [allType, setAllType] = useState<Array<allTypeI>>([]);
    const [allBrands, setAllBrands] = useState<Array<allTypeI>>([]);

    const [titleError, setTitleError] = useState<boolean>(false);
    const [typeError, setTypeError] = useState<boolean>(false);
    const [brandError, setBrandError] = useState<boolean>(false);
    const [photoError, setPhotoError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    // @ts-ignore
    const {user} = useSelector(state => state.user);

    const navigate = useNavigate();

    const formSubmit = async (e:FormEvent) => {
        e.preventDefault()
        console.log(Boolean(title.length > 0));

        const titleErrorStatus:boolean = Boolean(title.length <= 0)
        const typeErrorStatus:boolean = type <= 0
        const brandErrorStatus:boolean = brand <= 0
        const descriptionErrorStatus:boolean = Boolean(description.length <= 0)
        const photoErrorStatus:boolean = !photo

        setTitleError(titleErrorStatus);
        setTypeError(typeErrorStatus);
        setBrandError(brandErrorStatus);
        setDescriptionError(descriptionErrorStatus)
        setPhotoError(photoErrorStatus)

        console.log(user)

        if(!photo) return

        if(titleErrorStatus || typeErrorStatus || brandErrorStatus || descriptionErrorStatus || photoErrorStatus) return

        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('price', String(price));
        formData.append('discount',  String(discount));
        formData.append('count',  String(count));
        formData.append('countSales', '0');
        formData.append('typeId', String(type))
        formData.append('brandId', String(brand))
        formData.append('fullName', title)
        formData.append('text', description)
        formData.append('rating', '0')
        formData.append('photo', photo)
        formData.append('characteristics', JSON.stringify(characteristics))

        const {data} = await $authHost.post('/device', formData)
        //console.log(data)

        navigate(`/product/${data.device.id}`)
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setPhoto(selectedFile);
        }
    };

    const onChange = useCallback((value:string) => {
        setDescription(value)
    }, [])

    const characteristicsChange = (id:number, type:string, info:string) => {
        setCharacteristics(characteristics.map(item => {
            if(item.id !== id) return item;

            return {
                ...item,
                [type]: info
            }
        }))

    }

    const characteristicsDell = (id:number) => {
        setCharacteristics(characteristics.filter(item => item.id !== id))
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

    }, [])

    useEffect(() => {
        document.title = 'Add product'
    }, [])

    // @ts-ignore
    return (
        <div className={'content add-product'}>
            <h4 className={'add-product__title'}>Добавить товар</h4>
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
                    <span className={'add-product__form-name'}>Скидка на товар</span>
                    <input type={'number'} value={discount} onChange={(e) => {setDiscount(Number(e.target.value))}} />
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

                <div className={'add-product__form-photo'}>
                    <span className={'add-product__form-name'}>Выберите фото для продукта *</span>
                    <label className="input-file">
                        <input type="file" accept={"image/*"} onChange={handleFileChange} />
                        <span className="input-file-btn">Выберите файл</span>
                        <span>Выберите файл</span>
                        <span className={`add-product__form-error ${photoError ? 'add-product__form--error' : ''}`}>Нужно выбрать фото продукта</span>
                    </label>
                    { photo && <img src={ok} alt={'photo'}/> }
                </div>

                <div className={'add-product__form-description'}>
                    <span className={'add-product__form-name'}>Описание продукта *</span>
                    <SimpleMdeReact value={description} onChange={onChange} options={editorOptions}/>
                    <span className={`add-product__form-error ${descriptionError ? 'add-product__form--error' : ''}`}>Нужно составить описание продукта</span>
                </div>

                <div className={'add-product__form-characteristics'}>
                    <span className={'add-product__form-name'}>Характеристики продукта</span>
                    {
                        characteristics.map((item, index) => (
                            <div className={'add-product__form-characteristics-item'} key={item.id}>
                                <span>{index+1}.</span>
                                <input value={item.title} onChange={e => characteristicsChange(item.id, 'title', e.target.value)} />
                                <input value={item.description} onChange={e => characteristicsChange(item.id, 'description', e.target.value)} />
                                <span onClick={() => characteristicsDell(item.id)}>Удалить</span>
                            </div>
                        ))
                    }
                    <div className={'add-product__form-characteristics-btn'} onClick={() => setCharacteristics([...characteristics, {id: Date.now(), description: '', title: ''}])}>Добавить характеристику</div>
                </div>

                <hr />

                <button className={'add-product__form-btn'}>Добавить товар</button>
            </form>
        </div>
    );
};

export default AddProduct;