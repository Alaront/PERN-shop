import React, {ChangeEvent, FormEvent, useState} from 'react';
import {$authHost, $host} from "../../../axios";
import {useAppDispatch} from "../../../redux/helpers";
import {addBrand, editBrand} from "../../../redux/slice/brands";

const AdminAddNewProductType = () => {
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [file, setFile] = useState<File | null>(null);

    const dispatch = useAppDispatch();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };


    const editForm = async (e: FormEvent) => {
        e.preventDefault();

        if(!id) return

        if(name) {
            const params = {
                id: id,
                title: name
            }
            await $authHost.patch('/brand/title', params)
                .then(response => {
                    console.log('response 1')
                    dispatch(editBrand(response.data[1][0]))
                })
        }

        if(file) {
            const formData = new FormData();
            formData.append('id', id)
            formData.append('logo', file)

            await $authHost.patch('/brand/photo', formData)
                .then(response => {
                    console.log('response 2')
                    dispatch(editBrand(response.data[1][0]))
                })
        }

        setFile(null);
        setName('');
    }

    return (
        <div className={'admin-main__form-add-product-type'}>
            <h2 className={'admin-main__title'}>Edit brand</h2>
            <form className={'admin-main__form-add'} onSubmit={editForm}>
                <label>
                    Id : <input type={'text'} value={id} onChange={(e) => setId(e.target.value)}/>
                </label>
                <label>
                    New name: <input type={'text'} value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    New file: <input type="file" accept={"image/*"} onChange={handleFileChange} />
                </label>
                <button>Edit</button>
            </form>
        </div>
    );
};

export default AdminAddNewProductType;