import React, {FormEvent} from 'react';

const AdminProductsForm = () => {
    const searchEvent = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <form className={'admin-main__content-form'} onSubmit={searchEvent}>
            <label>
                Id: <input/>
            </label>
            <label>
                Full name: <input/>
            </label>
            <label>
                Name of shop: <input/>
            </label>
            <label>
                Brand: <input/>
            </label>
            <label>
                rating: <input/>
            </label>
            <button>Search</button>
        </form>
    );
};

export default AdminProductsForm;