import React, {useEffect, useState} from 'react';
import CartData from "../Components/Cart/CartData";
import CardAllChoosing from "../Components/Cart/CardAllChoosing";
import {readLSShopingCart} from "../helpers";
import {$host} from "../axios";
import {deviceCartI, deviceI} from "../helpers/interfaces";

const Cart = () => {
    const [mainCheck, setMainCheck] = useState<boolean>(false);

    const [product, setProduct] = useState<Array<deviceCartI> | []>([])

    const changeMainCheck = ():void => {
        const mainCheckOld = mainCheck;
        setMainCheck(!mainCheckOld)
        setProduct(
                product.map(item => {
                    return {...item, isCheck: !mainCheckOld}
                })
            )
    }

    const getProducts = async () => {
        const productInCart = await readLSShopingCart();

        const productId:Array<number> = productInCart.map(item => item.id);
        const params = {
            allId: productId
        }

        const {data} = await $host.post('/device/getDevicesById', params);

        console.log(productInCart.filter(itemCart => itemCart.id === 15)[0].count)

        const productData:Array<deviceCartI> = data.map((item: any) => ({...item, isCheck: false, cartCount: productInCart.filter(itemCart => itemCart.id === item.id)[0].count}))

        setProduct(productData)
    }

    const changeChecked = (id:number) => {
        setProduct(
            product.map(item => {
                if(item.id === id) return {...item, isCheck: !item.isCheck}

                return item
            })
        )
    }

    // useEffect(() => {
    //     setProduct(
    //         product.map(item => {
    //             return {...item, isCheck: mainCheck}
    //         })
    //     )
    //
    // }, [mainCheck])

    useEffect(() => {
        let hasNotCheck = false;

        product.forEach(item => {
            if(!item.isCheck) {
                hasNotCheck = true
            }
        })

        setMainCheck(!hasNotCheck)

    }, [product])

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className={'content content-cart'}>
            {
                product && <CartData mainCheck={mainCheck} changeMainCheck={changeMainCheck} product={product} changeChecked={changeChecked}/>
            }
            <CardAllChoosing  product={product}  />
        </div>
    );
};

export default Cart;