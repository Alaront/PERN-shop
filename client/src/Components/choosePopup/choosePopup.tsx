import React, {useState} from 'react';
import './index.sass'

interface ChoosePopupI {
    title: string,
    data: Array<dataI>
    change: Function,
    choose: number,
    closePopup: Function
}

interface dataI {
    id: number,
    name: string,
}

const ChoosePopup = ({change, data, title, choose, closePopup}: ChoosePopupI) => {
    return (
        <div className={'choose-popup'}>
            <div className={'choose-popup__wrapper'}>
                <p className={'choose-popup__title'}>{title}</p>
                <div className={'choose-popup__data'} >
                    {
                        data.map(item => (
                            <div className={`${item.id === choose  ? 'choose-popup__item--select' : ''} choose-popup__item`} key={item.id}>
                                <span onClick={() => change(item.id)}></span>
                                <p onClick={() => change(item.id)}>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
                <button className={'choose-popup__btn'} onClick={() => closePopup()}>Подтвердить</button>
                <div className={'choose-popup__close'} onClick={() => closePopup()}></div>
            </div>
        </div>
    );
};

export default ChoosePopup;