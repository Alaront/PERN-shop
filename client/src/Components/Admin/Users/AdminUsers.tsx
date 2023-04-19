import React, {useState} from 'react';
import './index.sass'
import {NavLink} from "react-router-dom";
import CheckComponent from "../../CheckComponent/CheckComponent";
import AdminUserForm from "./AdminUserForm";

interface allUserI {
    id: number,
    fullName: string,
    nameShop: string,
    email: string,
    rating: number,
    isBanned: boolean,
    link: string
}

const AdminUsers = () => {
    const [allUser, setAllUser] = useState<allUserI[]>([
        {
            id: 1,
            fullName: 'Test name',
            nameShop: 'Test name shop',
            email: 'Test email',
            rating: 32,
            isBanned: false,
            link: '#'
        },
        {
            id: 2,
            fullName: 'Test name two',
            nameShop: 'Test name shop two',
            email: 'Test email tweo',
            rating: 3222,
            isBanned: true,
            link: '$'
        }
    ])

    return (
        <div className={'admin-main'}>
            <h2 className={'admin-main__title'}>List of Users</h2>
            <div className={'admin-main__content'}>
                <div className={'admin-main__content-left'}>
                    <table className={'admin-main__content-table'}>
                        <thead>
                            <tr><th className={'admin-main__content-table-id'}>id</th><th>Full name</th><th>name of shop</th><th>email</th><th>rating</th><th>is banned ?</th><th>Открыть</th></tr>
                        </thead>
                        <tbody>
                            {
                                allUser.map(item => (
                                    <tr key={item.id} ><td>{item.id}</td><td>{item.fullName}</td><td>{item.nameShop}</td><td>{item.email}</td><td>{item.rating}</td><td> <CheckComponent state={item.isBanned} changeFunction={() => {}} /></td><td><NavLink to={item.link} target={"_blank"}>Открыть</NavLink></td></tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
                <div className={'admin-main__content-right'}>
                    <AdminUserForm />
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;