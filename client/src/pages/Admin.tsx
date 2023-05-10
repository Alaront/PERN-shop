import React, {useEffect} from 'react';
import {Outlet} from "react-router";
import Menu from '../Components/Admin/Menu/Menu';
import '../styles/admin.sass'

const Admin = () => {
    useEffect(() => {
        document.title = 'Admin';
    }, [])

    return (
        <div className='admin-page'>
            <Menu />
            <Outlet />
        </div>
    );
};

export default Admin;