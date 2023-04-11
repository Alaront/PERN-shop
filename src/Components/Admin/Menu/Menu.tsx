import React, {useState} from 'react';
import './index.sass'
import { NavLink} from "react-router-dom";

const Menu = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

    return (
        <>
            <div className={`admin-menu ${isOpenMenu ? 'admin-menu--show' : ''}`}>
                <ul>
                    <li className={'admin-menu__user'}>
                        <NavLink to={'/admin/users'} className={({isActive}) => isActive ? 'active-link' : ''}>Users</NavLink>
                    </li>
                    <li className={'admin-menu__brands'}>
                        <NavLink to={'/admin/brands'} className={({isActive}) => isActive ? 'active-link' : ''}>Brands</NavLink>
                        <NavLink to={'/admin/brandNew'} className={({isActive}) => isActive ? 'active-link' : ''}>Add new brand</NavLink>
                    </li>
                    <li className={'admin-menu__products'}>
                        <NavLink to={'/admin/products'} className={({isActive}) => isActive ? 'active-link' : ''}>Products</NavLink>
                    </li>
                    <li className={'admin-menu__products'}>
                        <NavLink to={'/admin/productsType'} className={({isActive}) => isActive ? 'active-link' : ''}>Products type</NavLink>
                    </li>
                </ul>
            </div>
            <div className={'admin-menu-need'} onClick={() => {setIsOpenMenu(!isOpenMenu)}}></div>
        </>
    );
};

export default Menu;