import React, {ChangeEvent, FormEvent, useState} from 'react';
import{$host} from "../../../axios";
import { updateType} from "../../../redux/slice/types";
import {useAppDispatch} from "../../../redux/helpers";

interface paramsI {
    id: string
    name?: string,
    slug?: string
}

const AdminAddNewProductType = () => {
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [slug, setSlug] = useState<string>('')

    const dispatch = useAppDispatch();

    const searchEvent = (e: FormEvent) => {
        e.preventDefault();

        if(!id) return

        const params:paramsI = {
            id,
        }

        if(name) params['name'] = name
        if(slug) params['slug'] = slug

        $host.patch('/type', params)
            .then(response => {
                setName('')
                setSlug('')
                dispatch(updateType(response.data[1][0]))
            })
    }

    return (
        <div className={'admin-main__form-add-product-type'}>
            <h2 className={'admin-main__title'}>Edit product type</h2>
            <form className={'admin-main__form-add'} onSubmit={searchEvent}>
                <label>
                    Id type: <input type={'text'} value={id} onChange={(e) => setId(e.target.value)}/>
                </label>
                <label>
                    New name: <input type={'text'} value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    New slug: <input type={'slug'} value={slug} onChange={(e) => setSlug(e.target.value)}/>
                </label>
                <button>Edit</button>
            </form>
        </div>
    );
};

export default AdminAddNewProductType;