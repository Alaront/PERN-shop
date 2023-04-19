import React from 'react';

const CardAllChoosing = () => {


    return (
        <div className={'card-all-choosing'}>
            <p className={'card-all-choosing__title'}><span>Итого</span><span>3 514,69 руб.</span></p>
            <p className={'card-all-choosing__products'}><span>5 товаров</span><span>3 764,45 руб.</span></p>
            <p className={'card-all-choosing__discount'}><span>Скидки</span><span>764,45 руб.</span></p>
            <div className={'card-all-choosing__btn'}>
                <span>К оформлению</span>
                <span>5 товаров - 3 764,45 руб.</span>
            </div>
        </div>
    );
};

export default CardAllChoosing;