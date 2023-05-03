import React, {useEffect, useState} from 'react';
import CartData from "../Components/Cart/CartData";
import CardAllChoosing from "../Components/Cart/CardAllChoosing";
import {dellLSShopingCart, readLSShopingCart} from "../helpers";
import {$authHost, $host} from "../axios";
import {deviceCartI, deviceI} from "../helpers/interfaces";

const Cart = () => {
    const [mainCheck, setMainCheck] = useState<boolean>(true);

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

        if(productInCart.length <= 0) return

        const productId:Array<number> = productInCart.map(item => item.id);
        const params = {
            allId: productId
        }

        const {data} = await $host.post('/device/getDevicesById', params);


        const productData:Array<deviceCartI> = data.map((item: any) => ({...item, isCheck: true, cartCount: productInCart.filter(itemCart => itemCart.id === item.id)[0].count}))

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

    const buyProduct = async () => {
        for (const item of product) {
            if(!item.isCheck) continue
            if(item.cartCount <= item.count && item.isCheck) {
                const params = {
                    id: item.id,
                    countForBuy: item.cartCount
                }
                const {data} = await $authHost.post('/device/buyDevice', params);
                alert(`Товар ${item.deviceInfo.fullName} был успешно куплен`)
                dellLSShopingCart(item.id)
                console.log(data)
            } else {
                alert(`Товара ${item.deviceInfo.fullName}(${item.cartCount}) не хватает на складе(${item.count})`)
            }
        }

        window.location.reload();
    }

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
            <CardAllChoosing  product={product}  buyProduct={buyProduct}/>
        </div>
    );
};

export default Cart;