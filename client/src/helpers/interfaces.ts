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

export interface questionAnswersI {
    id: number,
    text: string,
    user: {
        name: string,
        id: number
    },
    questionAnswers?: Array<questionAnswersI>
}

export interface deviceQuestionI {
    id: number,
    deviceId: number,
    text: string,
    user: {
        name: string,
        id: number
    },
    questionAnswers: Array<questionAnswersI>
}

export interface devicePhotosItem {
    id: number,
    url: string
}

export interface reviewCommentItem {
    id: number,
    reviewId: number,
    text: string,
    name: string
}

export interface reviewsItem {
    id: number,
    deviceId: number,
    positive: string,
    negative: string,
    text: string,
    rating: number,
    userId: number,
    updatedAt: string,
    user: {
        name: string
    }
    reviewComments: Array<reviewCommentItem>
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