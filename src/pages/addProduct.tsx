import React, {FormEvent, useEffect, useState} from 'react';
import '../styles/addProduct.sass'

interface photoItemI {
    id: number,
    data: FileList
}

const AddProduct = () => {
    const [title, setTitle] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [allPhotos, setNewPhoto] = useState<photoItemI[]>([])

    const formSubmit = (e:FormEvent) => {
        e.preventDefault()
        console.log(title, type)
    }

    const addNewPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if(allPhotos && files){
            setNewPhoto([...allPhotos, {id: Date.now(), data: files}]);
        }
        console.log(allPhotos)

    }

    useEffect(() => {
        console.log(allPhotos)
    }, [allPhotos])

    return (
        <div className={'content add-product'}>
            <h4 className={'add-product__title'}>Добавить товар</h4>
            <form className={'add-product__form'} onSubmit={formSubmit}>
                <div className={'add-product__form-title'}>
                    <span className={'add-product__form-name'}>Название товара</span>
                    <input type={'text'} value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    <span className={'add-product__form-error'}>Введите корректное название продукта</span>
                </div>

                <div className={'add-product__form-type'}>
                    <span className={'add-product__form-name'}>Выберите тип продукта</span>
                    <select name={type} onChange={e => setType(e.target.value)}>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="hamster">Hamster</option>
                        <option value="parrot">Parrot</option>
                        <option value="spider">Spider</option>
                        <option value="goldfish">Goldfish</option>
                    </select>
                </div>

                <div className={'add-product__form-brand'}>
                    <span className={'add-product__form-name'}>Выберите бренд продукта</span>
                    <select name={brand} onChange={e => setBrand(e.target.value)}>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="hamster">Hamster</option>
                        <option value="parrot">Parrot</option>
                        <option value="spider">Spider</option>
                        <option value="goldfish">Goldfish</option>
                    </select>
                </div>

                <div className={'add-product__form-photo'}>
                    <span className={'add-product__form-name'}>Выберите фото для продукта</span>
                    <label className="input-file">
                        <input type="file" name="file" onChange={addNewPhoto} accept="image/*"/>
                        <span className="input-file-btn">Выберите файл</span>
                        <span>Выберите файл</span>
                    </label>
                    {
                        allPhotos.map(photo =>
                            <div className={'add-product__form-photo-item'} key={photo.id}>
                                <img src={'https://i.stack.imgur.com/cLUPF.jpg?s=64&g=1'} alt={'photo'}/>
                            </div>
                        )
                    }
                </div>
                <button>Добавить товар</button>
            </form>
        </div>
    );
};

export default AddProduct;