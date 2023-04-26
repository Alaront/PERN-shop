import React, {useEffect, useState} from 'react';
import './index.sass'
import {NavLink} from "react-router-dom";
import CheckComponent from "../../CheckComponent/CheckComponent";
import AdminUserForm from "./AdminUserForm";
import{$host} from "../../../axios";

interface allUserI {
    id: number,
    name: string,
    email: string,
    isBanned: boolean,
    link: string
}

const AdminUsers = () => {
    const [allUser, setAllUser] = useState<allUserI[]>([])

    useEffect(() => {
        $host.get('/user').then(response => {
            const data = response.data;
            setAllUser(data)
        })
    }, [])

    return (
        <div className={'admin-main'}>
            <h2 className={'admin-main__title'}>List of Users</h2>
            <div className={'admin-main__content'}>
                <div className={'admin-main__content-left'}>
                    <table className={'admin-main__content-table'}>
                        <thead>
                            <tr><th className={'admin-main__content-table-id'}>id</th><th>Full name</th><th>email</th><th>is banned ?</th><th>Открыть</th></tr>
                        </thead>
                        <tbody>
                            {
                                allUser && allUser.map(item => (
                                    <tr key={item.id} ><td>{item.id}</td><td>{item.name}</td><td>{item.email}</td><td> <CheckComponent state={item.isBanned} changeFunction={() => {}} /></td><td><NavLink to={`/shopPage/${item.link}`} target={"_blank"}>Открыть</NavLink></td></tr>
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