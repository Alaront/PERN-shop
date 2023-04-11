import React, {FormEvent} from 'react';

const AdminUserForm = () => {
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
                Email: <input/>
            </label>
            <button>Search</button>
        </form>
    );
};

export default AdminUserForm;