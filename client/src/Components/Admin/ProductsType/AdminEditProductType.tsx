import React, {ChangeEvent, FormEvent, useState} from 'react';

const AdminAddNewProductType = () => {
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')

    const searchEvent = (e: FormEvent) => {
        e.preventDefault();
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
                <button>Edit</button>
            </form>
        </div>
    );
};

export default AdminAddNewProductType;