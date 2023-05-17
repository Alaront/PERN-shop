import React, {useEffect, useState} from 'react';
import '../styles/search.sass'
import {deviceCartI} from "../helpers/interfaces";
import {$host} from "../axios";
import {useParams} from "react-router";
import ShopPage from "./ShopPage";
import ProductCartShort from "../Components/Products/ProductCartShort";
import Loader from "react-loaders";

const SearchPage = () => {
    const [showFilters, setShowFilters] = useState<boolean>(false)
    const [devices, setDevices] = useState<Array<deviceCartI> | null >(null)
    const [name, setName] = useState<string>('')
    const [sort, setSort] = useState<String>('standard');
    const [star, setStar] = useState<number>(0)

    const {slug} = useParams();

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSort(value);
    };

    const getData = async () => {
        if(!slug) return

        const {data} = await $host.get('/device/search', {
            params: {
                slug,
                sort
            }
        })

        console.log(data)
        setDevices(data.device)
        setName(data.type.name)
    }

    useEffect(() => {
        getData()
    }, [sort])

    useEffect(() => {
        if(name) document.title = name
    }, [name])

    const changeCheck = (index:number) => {
        console.log(index)
        if(index === star) {
            setStar(0)
        } else {
            setStar(index)
        }
    }

    return (
        <div className={'content search-page'}>
            <h3 className={'search-page__title'}>{name}</h3>
            <div className={'search-page__wrapper'}>
                <div className={`search-page__filters ${showFilters ? 'search-page__filters--open' : ''}`}>
                    <div className={'close-filter-btn'} onClick={() => setShowFilters(false)}></div>
                    <div className={'search-page__stars-filter'}>
                        <p>Рейтинг</p>
                        {
                            [...Array(5 )].map((item, index) => (
                                <div className={'search-page__stars'} key={index}>
                                    {
                                        [...Array(5 - Math.floor(index))].map((itemStar, indexStar) => <span key={indexStar} className={'search-page__star'}></span>)
                                    }
                                    <div className={`search-page__box ${star === 5 - index ? 'search-page__box--check' : ''}`} onClick={() => changeCheck(5 - index)}></div>
                                    {
                                       5 - index
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={'search-page__content'}>
                    <div className={'search-page__sort'}>
                        <p>Сортировка: </p>
                        <select onChange={selectChange} defaultValue={'standard'}>
                            <option value={'standard'}> По умолчанию </option>
                            <option value="priceUp">По цене(возрастанию)</option>
                            <option value="priceDown">По цене (убыванию)</option>
                            <option value="ratingUp">По рейтингу (возрастанию)</option>
                            <option value="ratingDown">По рейтингу (убыванию)</option>
                        </select>
                    </div>
                    <div className={'search-page__devices'}>
                        {
                            devices
                                ? devices.map(item => {
                                    if(star === 0) return <ProductCartShort key={item.id} title={item.deviceInfo?.fullName} photoUrl={item.deviceInfo?.mainPhoto} price={item.price} discount={item.discount} hrefLink={String(item.id)} />
                                    if(item.deviceInfo.rating === star) return <ProductCartShort key={item.id} title={item.deviceInfo?.fullName} photoUrl={item.deviceInfo?.mainPhoto} price={item.price} discount={item.discount} hrefLink={String(item.id)} />
                                } )
                                : <Loader type="pacman" active={true} />
                        }
                    </div>
                    <div className={'show-filter-btn'} onClick={() => setShowFilters(true)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;