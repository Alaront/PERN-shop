import React, {useEffect, useRef, useState} from 'react';
import './index.sass'
import {ReactComponent as SearchSvg} from '../../images/decor/search.svg'
import {ReactComponent as CloseSvg} from '../../images/decor/close.svg'
import SearchItem from "./SearchItem";
import {$host} from "../../axios";

interface deviceI {
    price: number,
    id: number
}

interface deviceInfoI {
    mainPhoto: string,
    fullName: string,
    device: deviceI
}

const Search = () => {
    const [device, setDevice] = useState<Array<deviceInfoI>>([])
    const nameRef = useRef<HTMLInputElement | null>(null)

    const formEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('form event')
        if(!nameRef.current?.value) nameRef.current?.focus();

        const {data} = await $host.get('/device/getDevicesBySubString', {
            params: {
                str: nameRef.current?.value
            }
        })

        console.log(data)
    }

    const inputEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('input event')

        if(nameRef.current?.value.length === 0) {
            setDevice([]);
            return
        }

        const {data} = await $host.get('/device/getDevicesBySubString', {
            params: {
                str: nameRef.current?.value
            }
        })

        setDevice(data)
    }

    const clearInput = () => {
            setDevice([]);

            if(nameRef.current?.value){
                nameRef.current.value = ''
            }
    }

    return (
        <form className={'header__search'} onSubmit={e => formEvent(e)}>
            <button className={'header__btn-search'}>
                <SearchSvg />
            </button>
            <input type={'text'} ref={nameRef} className={'header__search-input'} onChange={e => inputEvent(e)} />
            {
                nameRef.current?.value.length != 0 && <span  className={'header__search-clear'} onClick={() => clearInput()}>
                                                            <CloseSvg />
                                                    </span>
            }
            <div className={'header__search-wrapper'}>
                {
                    device && device.map(item => <SearchItem key={item.device.id} id={String(item.device.id)} name={item.fullName} price={item.device.price} imgUrl={item.mainPhoto}/>)
                }
            </div>
        </form>
    );
};

export default Search;