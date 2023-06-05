import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {$host} from "../../../axios";
import {brandI} from "../../../helpers/interfaces";
import {makeFullPhotoUrl} from "../../../helpers";

interface topBrandI {
    brandParams: number
}

const TopBrand = ({brandParams}:topBrandI) => {
    const [brand, setBrand] = useState<brandI | null>(null)

    const {id} = useParams();

    const getData = async () => {
        if(!brandParams) return

        const {data} = await $host.get(`brand/one/${brandParams}`);
        console.log('Data', data)
        setBrand(data)

    }

    useEffect(() => {
        getData();
    }, [id])

    if(!brand) return <></>

    return (
        <div className={'top-content__brand'}>
            <div className={'top-content__brand-logo'}>
                <img src={makeFullPhotoUrl(brand.photo)} alt={'logo'} />
            </div>
            <div className={'top-content__brand-text'}>
                <p>{brand.name}</p>
            </div>
        </div>
    );
};

export default TopBrand;