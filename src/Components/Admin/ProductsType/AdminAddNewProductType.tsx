import React, {FormEvent} from 'react';

const AdminAddNewProductType = () => {
    const searchEvent = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className={'admin-main__form-add-product-type'}>
            <h2 className={'admin-main__title'}>Add new product type</h2>
            <form className={'admin-main__form-add'} onSubmit={searchEvent}>
                <label>
                    Full name: <input type={'text'}/>
                </label>
                <button>Search</button>
            </form>
        </div>
    );
};

export default AdminAddNewProductType;