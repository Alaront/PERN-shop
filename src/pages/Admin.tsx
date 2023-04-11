import React from 'react';
import {Outlet} from "react-router";
import Menu from '../Components/Admin/Menu/Menu';
import '../styles/admin.sass'

const Admin = () => {
    return (
        <div className='admin-page'>
            <Menu />
            <Outlet />
        </div>
    );
};

export default Admin;