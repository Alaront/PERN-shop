import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import '../styles/userSetting.sass';
import {NavLink} from "react-router-dom";
import {$host} from "../axios";
import {deviceCartI} from "../helpers/interfaces";
import {makeDataFormat} from "../helpers";
import Loader from "react-loaders";

const UserSetting = () => {

    const [devices, setDevices] = useState<Array<deviceCartI> | null>(null)
    // @ts-ignore
    const {user, status} = useSelector(state => state.user)
    const navigate = useNavigate();

    const getData = async () => {
        if(!user.id) return

        const params = {
            shopId: user.id
        }

        const {data} = await $host.post('/device/getDevicesByShop', params)
        console.log(data)
        setDevices(data)
    }

    useEffect(() => {
        getData();
        document.title = 'User setting';
    }, [user])


    if(status === 'loaded' && user['id'] === undefined) navigate('/')

    if(status === 'padding') {
        return  <div className={'content'}></div>
    }

    return (
        <div className={'content user-setting'}>
            <h3 className={'user-setting__title'}>Личный кабинет пользователя</h3>
            <div className={'user-setting__links'}>
                <NavLink to={`/addProduct`}>Добавить продукт</NavLink>
                <NavLink to={`/shopPage/${user.id}`}>Открыть страницу</NavLink>
                <NavLink to={`/editShopPage/${user.id}`}>Редактировать главную страницу</NavLink>
                <NavLink to={`/userOperation/${user.id}`}>Операции пользователя</NavLink>
            </div>
            <table className={'user-setting__devices'}>
                <thead className={'user-setting__devices'}>
                <tr><th className={'user-operation__content-table-id'}>№</th><th className={'user-operation__content-table-id'}>id</th><th>Товар</th><th>Кол-во</th><th>Сумма</th><th>Редактировать</th><th>Редактировать фото</th></tr>
                </thead>

                <tbody>
                {
                    devices
                        ? devices.map((item, index) => <tr key={item.id}><td>{index + 1}</td><td>{item.id}</td><td><NavLink to={`/product/${item.id}`}>Товар</NavLink></td><td>{item.count}</td><td>{item.price}$</td><td><NavLink to={`/editProduct/${String(item.id)}`} target={'_blank'}>Редактировать</NavLink></td><td><NavLink to={`/editProductPhoto/${String(item.id)}`} target={'_blank'}>Редактировать фото</NavLink></td></tr>)
                        : <Loader type="pacman" active={true} />
                }
                </tbody>
            </table>
        </div>
    );
};

export default UserSetting;