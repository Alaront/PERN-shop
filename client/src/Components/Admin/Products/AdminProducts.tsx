import React, {useState} from 'react';
import './index.sass'
import {NavLink} from "react-router-dom";
import AdminProductsForm from "./AdminProductsForm";

interface allProductsI {
    id: number,
    fullName: string,
    nameShop: string,
    brand: string,
    rating: number,
    link: string
}

const AdminProducts = () => {
    const [allProducts, setAllProducts] = useState<allProductsI[]>([
        {
            id: 1,
            fullName: 'Test name',
            nameShop: 'Test name shop',
            brand: 'Test email',
            rating: 32,
            link: '#'
        },
        {
            id: 2,
            fullName: 'Test name two',
            nameShop: 'Test name shop two',
            brand: 'Test email tweo',
            rating: 3222,
            link: '$'
        }
    ])

    return (
        <div className={'admin-main'}>
            <h2 className={'admin-main__title'}>List of Products</h2>
            <div className={'admin-main__content'}>
                <div className={'admin-main__content-left'}>
                    <table className={'admin-main__content-table'}>
                        <thead>
                        <tr><th className={'admin-main__content-table-id'}>id</th><th>Full name</th><th>name of shop</th><th>brand</th><th>rating</th><th>Открыть</th></tr>
                        </thead>
                        <tbody>
                        {
                            allProducts.map(item => (
                                <tr key={item.id} ><td>{item.id}</td><td>{item.fullName}</td><td>{item.nameShop}</td><td>{item.brand}</td><td>{item.rating}</td><td><NavLink to={item.link} target={"_blank"}>Открыть</NavLink></td></tr>
                            ))
                        }
                        </tbody>

                    </table>
                </div>
                <div className={'admin-main__content-right'}>
                    <AdminProductsForm />
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;