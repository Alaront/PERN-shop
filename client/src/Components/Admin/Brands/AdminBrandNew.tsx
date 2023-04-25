import React, {ChangeEvent, FormEvent, useState} from 'react';
import './index.sass'
import axios from "../../../axios";
import {addBrand} from "../../../redux/slice/brands";

const AdminBrandNew = () => {
    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const pushForm = (e:FormEvent) => {
        e.preventDefault();
        console.log(name)
        console.log(file)

        if(!name || !file) return

        const formData = new FormData();
        formData.append('title', name);
        formData.append('logo', file)

        axios.post('/brand', formData)
            .then(response => {
                addBrand(response.data)
                setFile(null);
                setName('');
            })
    }

    return (
        <div className={'admin-main'}>
            <h2 className={'admin-main__title'}>Add new brand</h2>
            <div className={'admin-main__content'}>
                <form className={'admin-main__form-add'} onSubmit={pushForm}>
                    <label>Name: <input type={'text'} value={name} onChange={(e) => setName(e.target.value)}/></label>
                    <label className={'admin-main__form-add-file'}>Logo:<input type="file" accept={"image/*"} onChange={handleFileChange} /></label>
                    <button>Add new brand</button>
                </form>
            </div>
        </div>
    );
};

export default AdminBrandNew;