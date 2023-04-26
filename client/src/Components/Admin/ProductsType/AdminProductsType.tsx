import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import AdminProductsTypeForm from "./AdminProductsTypeForm";
import AdminAddNewProductType from "./AdminAddNewProductType";
import AdminEditProductType from "./AdminEditProductType";
import {useDispatch, useSelector} from "react-redux";
import {fetchTypes, removeType} from "../../../redux/slice/types";
import {useAppDispatch} from "../../../redux/helpers";
import {$authHost, $host} from "../../../axios";

interface allProductsTypeI {
    id: number,
    name: string,
    slug: string,
}

interface productsTypeI {
    allTypes: Array<allProductsTypeI>,
    status: string
}

const AdminProductsType = () => {
    // @ts-ignore
    const allProductsType:productsTypeI = useSelector((state) => state.types);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTypes())
    }, [])

    const dellType = (id:number, name:string) => {
        if(!id) return

        const config = {
            data: {
                id
            }
        }

        if (window.confirm(`Удалить ${name} ?`)) {
            $authHost.delete('/type', config)
                .then(data => {
                    dispatch(removeType(id))
                })
        }
    }

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
                        <tr><th className={'admin-main__content-table-id'}>id</th><th>Full name</th><th>Slug</th><th>Dell</th></tr>
                        </thead>
                        <tbody>
                        {
                            allProductsType.allTypes && allProductsType.allTypes.map(item => (
                                <tr key={item.id} ><td>{item.id}</td><td>{item.name}</td><td>{item.slug}</td><td  className={'admin-main__content-table-dell'} onClick={() => dellType(item.id, item.name)}>X</td></tr>
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