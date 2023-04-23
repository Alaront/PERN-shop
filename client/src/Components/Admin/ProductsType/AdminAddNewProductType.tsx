import React, {FormEvent, useState} from 'react';

const AdminAddNewProductType = () => {
    const [name, setName] = useState<string>('')

    const searchEvent = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className={'admin-main__form-add-product-type'}>
            <h2 className={'admin-main__title'}>Add new product type</h2>
            <form className={'admin-main__form-add'} onSubmit={searchEvent}>
                <label>
                    Full name: <input type={'text'} value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <button>Search</button>
            </form>
        </div>
    );
};

export default AdminAddNewProductType;