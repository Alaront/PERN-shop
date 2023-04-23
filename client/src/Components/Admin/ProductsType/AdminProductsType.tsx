import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import AdminProductsTypeForm from "./AdminProductsTypeForm";
import AdminAddNewProductType from "./AdminAddNewProductType";
import AdminEditProductType from "./AdminEditProductType";

interface allProductsTypeI {
    id: number,
    fullName: string,
}

const AdminProductsType = () => {
    const [allProductsType, setAllProductsType] = useState<allProductsTypeI[]>([
        {
            id: 1,
            fullName: 'Test name',
        },
        {
            id: 2,
            fullName: 'Test name two',
        }
    ])

    return (
        <div className={'admin-main'}>
            <div className={'admin-main__forms'}>
                <AdminAddNewProductType />
                <AdminEditProductType />
            </div>
            <h2 className={'admin-main__title'}>List of products type</h2>
            <div className={'admin-main__content'}>
                <div className={'admin-main__content-left'}>
                    <table className={'admin-main__content-table'}>
                        <thead>
                        <tr><th className={'admin-main__content-table-id'}>id</th><th>Full name</th></tr>
                        </thead>
                        <tbody>
                        {
                            allProductsType.map(item => (
                                <tr key={item.id} ><td>{item.id}</td><td>{item.fullName}</td></tr>
                            ))
                        }
                        </tbody>

                    </table>
                </div>
                <div className={'admin-main__content-right'}>
                    <AdminProductsTypeForm />
                </div>
            </div>
        </div>
    );
};

export default AdminProductsType;