import {EVENT_ADD_GOODS_CARD, SHOPING_CARD_KEY, SHOPING_CHECK_KEY} from "./consts";
import {cartData, deviceCartI} from "./interfaces";

function writeLSProductCheck(id: number):void {
    let data:string | null = localStorage.getItem(SHOPING_CHECK_KEY);

    let newData:Array<number> = [];

    if(data !== null) {
        console.log('!@!@!')
        const arrayDataCheck:Array<number> = JSON.parse(data);

        if(arrayDataCheck.includes(id)) return

        newData = arrayDataCheck.length < 10 ? [id, ...arrayDataCheck] : [id, ...arrayDataCheck.slice(0, 9)];
    } else {
        newData = [id]
    }

    data = JSON.stringify(newData);

    localStorage.setItem(SHOPING_CHECK_KEY, data);
}

function readLSProductCheck():Array<number> {
    let data:string | null = localStorage.getItem(SHOPING_CHECK_KEY);

    if(data !== null) {
        return JSON.parse(data)
    }

    return []
}

async function writeLSShopingCart(id: number, count:number): Promise<void> {
    let data:string | null = localStorage.getItem(SHOPING_CARD_KEY);

    let arraDataCard:Array<object> = []

    console.log('writeLSShopingCart', id, count, data)

    if (data != null) {
        let dataFromLS:Array<cartData> = await JSON.parse(data)

        let allId:Array<number> = dataFromLS.map(item => item.id);

        console.log('dataFromLS', dataFromLS)

        if(allId.includes(id)) {
            arraDataCard = dataFromLS.map(item => {
                if (item.id === id) {
                    return {id, count: 1 + item.count}
                }

                return item
            })
        } else {
            arraDataCard = [...dataFromLS, {id, count}]
        }

        console.log('dataFromLS 2', dataFromLS)

    } else {
        arraDataCard = [{id, count}]
    }

    localStorage.setItem(SHOPING_CARD_KEY, JSON.stringify(arraDataCard));
    document.dispatchEvent(new Event(EVENT_ADD_GOODS_CARD))
}

function newDataLSShopingCart(arraDataCard:Array<deviceCartI>) {
    let dataToLS:Array<cartData> = arraDataCard.map(item => {
        return { id: item.id, count: item.cartCount }
    } )

    localStorage.setItem(SHOPING_CARD_KEY, JSON.stringify(dataToLS));
}

function dellLSShopingCart(id:number):void {
    let data:string | null = localStorage.getItem(SHOPING_CARD_KEY);

    if (data) {
        let dataFromLS:Array<cartData> = JSON.parse(data);

        dataFromLS = dataFromLS.filter(item => item.id !== id)
        localStorage.setItem(SHOPING_CARD_KEY, JSON.stringify(dataFromLS));
    }
}

async function readLSShopingCart(): Promise<Array<cartData>> {
    let data:string | null = localStorage.getItem(SHOPING_CARD_KEY);

    if (data) {
        let dataFromLS:Array<cartData> = await JSON.parse(data)
        //console.log(data)

        return dataFromLS
    }

    return []

}

function makeFullPhotoUrl(dataJson:string):string {
    try {
        const data = JSON.parse(dataJson);
        return data.newUrl
    } catch (e) {
        console.log(e)
    }

    return ''
}

const makeDataFormat = (dateStr:string):string => {
    const date = new Date(dateStr);
    const options:object = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options)
}

export {writeLSShopingCart, readLSShopingCart, makeFullPhotoUrl, dellLSShopingCart, makeDataFormat, writeLSProductCheck, readLSProductCheck, newDataLSShopingCart}