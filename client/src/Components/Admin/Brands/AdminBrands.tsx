import React, {useEffect, useState} from 'react';
import './index.sass'
import AdminBrandsForm from "./AdminBrandsForm";
import AdminEditBrands from "./AdminEditBrands";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../redux/helpers";
import {fetchBrands, removeBrand} from "../../../redux/slice/brands";
import {makeFullPhotoUrl} from "../../../helpers";
import {$authHost, $host} from "../../../axios";
import {removeType} from "../../../redux/slice/types";
import {brandI} from "../../../helpers/interfaces";



interface allBrandsI {
    allBrands: Array<brandI>,
    status: string
}

const AdminBrands = () => {
    // @ts-ignore
    const allBrands:allBrandsI = useSelector((state) => state.brands);
    console.log(allBrands)

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('start fetch')
        dispatch(fetchBrands());
    }, [])


    const dellType = (id:number, name: string) => {
        if(!id) return

        const config = {
            data: {
                id
            }
        }

        if (window.confirm(`Удалить ${name} ?`)) {
            $authHost.delete('/brand', config)
                .then(data => {
                    dispatch(removeBrand(id))
                })
        }
    }

    return (
        <div className={'admin-main'}>
            <AdminEditBrands />
            <h2 className={'admin-main__title'}>Brands</h2>
            <div className={'admin-main__content'}>
                <div className={'admin-main__content-left'}>
                    <table className={'admin-main__content-table'}>
                        <thead>
                        <tr><th className={'admin-main__content-table-id'}>id</th><th>logo</th><th>full name</th><th>Dell</th></tr>
                        </thead>
                        <tbody>
                        {
                            allBrands.allBrands && allBrands.allBrands.map(item => (
                                <tr key={item.id}><td>{item.id}</td><td><img src={makeFullPhotoUrl(item.photo)} alt={item.name}/></td><td>{item.name}</td><td  className={'admin-main__content-table-dell'} onClick={() => dellType(item.id, item.name)}>X</td></tr>
                            ))
                        }
                        </tbody>

                    </table>
                </div>
                <div className={'admin-main__content-right'}>
                    <AdminBrandsForm />
                </div>
            </div>
        </div>
    );
};

export default AdminBrands;