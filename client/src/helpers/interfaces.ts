import sellerComment from "../Components/Seller/SellerComment";

export interface cartData {
    id: number,
    count: number
}

export interface deviceI {
    id: number,
    brandId: number,
    count: number,
    countSales: number,
    price: number,
    discount: number,
    typeId: number,
    userShopId: number
}

export interface deviceInfoI {
    id: number,
    deviceId: number,
    fullName: string,
    mainPhoto: string,
    rating: number,
    ratingSetUsers: "",
    text: string,
}

export interface devicePhotosItem {
    id: number,
    url: string
}

export interface deviceCharacteristicItem {
    id: number
    deviceId: number,
    title: string,
    description: string,
}

interface deviceSimilarInfo {
    fullName: string,
    mainPhoto: string
}

export interface deviceSimilar {
    id: number,
    discount: number,
    price: number,
    deviceInfo: deviceSimilarInfo
}