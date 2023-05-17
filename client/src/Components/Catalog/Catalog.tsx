import React, {useEffect, useState} from 'react';

import './index.sass'
import {NavLink} from "react-router-dom";
import {$host} from "../../axios";
import Loader from "react-loaders";

interface catalogItemI {
    name: string,
    slug: string,
    id: number
}

interface CatalogI {
    show: boolean,
}

const Catalog = ({show}:CatalogI) => {
    const [catalogList, setCatalogList] = useState<Array<catalogItemI> | null>(null)

    const getData = async () => {
        const {data} = await $host.get('/type');
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
                    catalogList ? catalogList.map(item => <NavLink key={item.id} target={'_blank'} to={`search/${item.slug}`}>{item.name}</NavLink>) : <Loader type="pacman" active={true} />
                }
            </div>
        </div>
    );
};

export default Catalog;