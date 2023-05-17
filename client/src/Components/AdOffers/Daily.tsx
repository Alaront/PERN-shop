import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import DailySlide from "./DailySlide";
import Loader from 'react-loaders'
import watchPhoto from '../../images/products/watch.png'

import './index.sass'
import 'swiper/css';
import {deviceCartI, deviceI} from "../../helpers/interfaces";
import {$host} from "../../axios";

const Daily = () => {
    const [time, setTime] = useState<string>('');
    const [device, setDevice] = useState<Array<deviceCartI> | null>(null)

    const update = () => {
        const dt:Date = new Date
        const tz:number = dt.getTimezoneOffset()
        const now:number = Math.floor(Number(dt) / 1000 - tz * 60)
        const next:number = Math.ceil((Number(dt) / 1000 / 60 - tz) / 60 / 24) * 60 * 60 * 24
        const left:number = next - now
        const text:string = ~~(left/60/60) + ":" + ~~(left/60%60) + ":" + ~~(left%60)
        setTime(text)
    }

    const getData = async () => {
        const {data} = await $host.get('/device/getDevicesForMain', {
            params: {
                type: 'discount'
            }
        });

        setDevice(data)

    }

    useEffect(() => {
        update()
        setInterval(update, 1000)

        getData();
    }, [])

    return (
        <div className={'deals'}>
            <div className={'deals__title'}>
                <h4 className={'deals__text'}>Скидки сегодня</h4>
                <div className={'deals__time'}>Осталось: <span>{time}</span></div>
            </div>
            <div className={'deals__offers'}>
                {
                    !device && <Loader type="pacman" active={true} />
                }
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={'auto'}
                    className={'deals-slider'}
                >
                    {
                        device && device.map(item => (
                            <SwiperSlide key={item.id}>
                                <DailySlide title={item.deviceInfo?.fullName} discount={item.discount} photo={item.deviceInfo?.mainPhoto} linkHref={String(item.id)}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Daily;