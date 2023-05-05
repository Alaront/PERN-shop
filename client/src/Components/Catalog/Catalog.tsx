import React, {useEffect, useState} from 'react';

import './index.sass'
import {NavLink} from "react-router-dom";
import {$host} from "../../axios";

interface catalogItemI {
    name: string,
    slug: string,
    id: number
}

interface CatalogI {
    show: boolean,
}

const Catalog = ({show}:CatalogI) => {
    const [catalogList, setCatalogList] = useState<Array<catalogItemI>>([])

    const getData = async () => {
        const {data} = await $host.get('/type');
        console.log(data)
        setCatalogList(data)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className={`catalog ${show ? 'catalog-show' : ''}`}>
            <h6 className={'catalog__title'}>Каталог продукции</h6>
            <div className={'catalog__wrapper'}>
                {
                    catalogList && catalogList.map(item => <NavLink key={item.id} target={'_blank'} to={`search/${item.slug}`}>{item.name}</NavLink>)
                }
            </div>
        </div>
    );
};

export default Catalog;