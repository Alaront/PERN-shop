import {EVENT_ADD_GOODS_CARD, SHOPING_CARD_KEY} from "./consts";
import {cartData} from "./interfaces";

async function writeLSShopingCart(id: number | string, count:number): Promise<void> {
    let data:string | null = localStorage.getItem(SHOPING_CARD_KEY);

    let arraDataCard:Array<object> = []

    if (data != null) {
        let dataFromLS:Array<cartData> = await JSON.parse(data)

        arraDataCard = dataFromLS.map(item => {
            if (item.id === id) {
                return {id, count: count + item.count}
            }

            return item
        })

    } else {
        arraDataCard = [{id, count}]
    }

    localStorage.setItem(SHOPING_CARD_KEY, JSON.stringify(arraDataCard));
    document.dispatchEvent(new Event(EVENT_ADD_GOODS_CARD))
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

export {writeLSShopingCart, readLSShopingCart, makeFullPhotoUrl}