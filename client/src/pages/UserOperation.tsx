import React, {useEffect, useState} from 'react';
import '../styles/userOperation.sass'
import {makeDataFormat, makeFullPhotoUrl} from "../helpers";
import {NavLink} from "react-router-dom";
import {$authHost} from "../axios";
import {useNavigate, useParams} from "react-router";
import {userOperationI} from "../helpers/interfaces";
import {useSelector} from "react-redux";

const UserOperation = () => {
    const [typeSort, setTypeSort] = useState<string>('Все');
    const [operationData, setOperationData] = useState<Array<userOperationI> | []>([])

    const {id} = useParams();
    const navigate = useNavigate();

    // @ts-ignore
    const user = useSelector((state) => state.user)

    const changeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTypeSort(e.target.value)
    }

    const getData = async () => {
        const {data} = await $authHost.get(`/user/operation/${id}`)
        console.log(data)
        setOperationData(data)
    }

    useEffect(() => {
        getData();
    }, [])


    if(user.status === 'padding') {
        return <></>
    } else if (user.status === 'loaded' && Number(id) !== user.user.id){
        console.log(id, user)
        navigate('/')
    }

    return (
        <div className={'content user-operation'}>
            <h4 className={'user-operation__title'}>Операции пользователя {user.user.email}</h4>

            <div className={'user-operation__sort'}>
                <label>
                    <input name={'typeSort'} value={'Все'} type={'radio'} checked={typeSort === 'Все'} onChange={e => changeSort(e)}/> Все
                </label>
                <label>
                    <input name={'typeSort'} value={'Покупка'} type={'radio'} checked={typeSort === 'Покупка'} onChange={e => changeSort(e)}/> Покупка
                </label>
                <label>
                    <input name={'typeSort'} value={'Продажа'} type={'radio'} checked={typeSort === 'Продажа'} onChange={e => changeSort(e)}/> Продажа
                </label>
            </div>

            <table className={'user-operation__content-table'}>
                <thead>
                    <tr><th className={'user-operation__content-table-id'}>№</th><th className={'user-operation__content-table-id'}>id</th><th>Товар</th><th>Кол-во</th><th>Сумма</th><th>Тип</th><th>Дата</th></tr>
                </thead>

                <tbody>
                    {
                        operationData && operationData.map((item, index) => {
                            if (item.type === typeSort || typeSort === 'Все') return <tr key={item.id}><td>{index + 1}</td><td>{item.id}</td><td><NavLink to={`/product/${item.product}`}>Товар</NavLink></td><td>{item.count}</td><td>{item.sum}$</td><td>{item.type}</td><td>{makeDataFormat(item.updatedAt)}</td></tr>
                        })
                    }
                </tbody>

            </table>
        </div>
    );
};

export default UserOperation;