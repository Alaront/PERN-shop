import React, {FormEvent} from 'react';
import './index.sass'

const AdminBrandNew = () => {
    const pushForm = (e:FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className={'admin-main'}>
            <h2 className={'admin-main__title'}>Add new brand</h2>
            <div className={'admin-main__content'}>
                <form className={'admin-main__form-add'} onSubmit={pushForm}>
                    <label>Name: <input type={'text'}/></label>
                    <label className={'admin-main__form-add-file'}>Logo: <input type={'file'} accept={"image/*"}/></label>
                    <button>Add new brand</button>
                </form>
            </div>
        </div>
    );
};

export default AdminBrandNew;