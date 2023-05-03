import React, {useEffect, useState} from 'react';
import {deviceCartI} from "../../helpers/interfaces";

interface cardAllChoosingI {
    product: Array<deviceCartI>,
    buyProduct: Function
}

const CardAllChoosing = ({product, buyProduct}:cardAllChoosingI) => {

    const [allSum, setAllSum] = useState<number>(0)
    const [countProducts, setCountProducts] = useState<number>(product.length)
    //const [sumCountProducts, setSumCountProducts] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [order, setOrder] = useState<number>(0)

    useEffect(() => {
        const allSumTemp:number = product.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.isCheck ? currentValue.price : 0),
            0
        )

        const discountTemp:number = product.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.isCheck ? ((currentValue.price * currentValue.discount) / 100) : 0),
            0
        )

        setCountProducts(
            product.reduce(
                (accumulator, currentValue) => accumulator + (currentValue.isCheck ? currentValue.cartCount : 0),
                0
            )
        )

        setAllSum(allSumTemp )
        setDiscount(discountTemp)
        setOrder(Math.ceil(allSumTemp - discountTemp))


    }, [product])

    return (
        <div className={'card-all-choosing'}>
            <p className={'card-all-choosing__title'}><span>Итого</span><span>{allSum}</span></p>
            <p className={'card-all-choosing__products'}><span>{countProducts} товаров</span><span>{allSum} $</span></p>
            <p className={'card-all-choosing__discount'}><span>Скидки</span><span>{discount} $</span></p>
            <div className={'card-all-choosing__btn'} onClick={() => buyProduct()}>
                <span>Купить</span>
                <span>{countProducts} товаров - {order} $</span>
            </div>
        </div>
    );
};

export default CardAllChoosing;