import React, {FormEvent, useState} from 'react';
import {useAppDispatch} from "../../../redux/helpers";
import {$authHost, $host} from "../../../axios";
import {addType} from "../../../redux/slice/types";

interface paramsI {
    name: string,
    slug?: string
}

const AdminAddNewProductType = () => {
    const [name, setName] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const dispatch = useAppDispatch();

    const searchEvent = async (e: FormEvent) => {
        e.preventDefault();

        if(!name) return

        const params:paramsI = {
            name,
        }

        if(slug) params['slug'] = slug

        $authHost.post('/type', params)
            .then(response => {
                console.log(response)
                setName('')
                setSlug('')
                dispatch(addType(response.data))
            })
    }

    return (
        <div className={'admin-main__form-add-product-type'}>
            <h2 className={'admin-main__title'}>Add new product type</h2>
            <form className={'admin-main__form-add'} onSubmit={searchEvent}>
                <label>
                    Full name: <input type={'text'} value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Slug: <input type={'text'} value={slug} onChange={(e) => setSlug(e.target.value)}/>
                </label>
                <button>Add</button>
            </form>
        </div>
    );
};

export default AdminAddNewProductType;