import {EVENT_ADD_GOODS_CARD, SHOPING_CARD_KEY} from "./consts";
import {cartData} from "./interfaces";

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

function makeFullPhotoUrl(url:string):string {
    return `http://localhost:7000/${url}`
}

const makeDataFormat = (dateStr:string):string => {
    const date = new Date(dateStr);
    const options:object = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options)
}

export {writeLSShopingCart, readLSShopingCart, makeFullPhotoUrl, dellLSShopingCart, makeDataFormat}