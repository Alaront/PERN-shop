import React, {useState} from 'react';

import './style.sass'
import TopSlider from "./TopSlider";
import Bitmap from '../../../images/products/Bitmap.png'

import TopInfo from "./TopInfo";

export interface typeProduct {
    id: number,
    title: string,
    photoUrl: string
}

const TopContent = () => {
    const [grade, setGrade] = useState<number>(4.6);
    const [productTitle, setProductTitle] = useState<string>('Набор электронных компонентов для Arduino R3 UNO R3 в коробке, 830 точек связи');

    const [productType, setProductType] = useState<typeProduct[]>([
            {
                id: 1,
                title: 'Other',
                photoUrl: Bitmap
            },
            {
                id: 2,
                title: 'Other 2',
                photoUrl: Bitmap
            }
        ]
    )

    return (
        <div className={'top-content'}>
            <h1 className={'top-content__title'}>{productTitle}</h1>
            <div className={'top-content__info-left'}>
                <div className={'top-content__grade'}>
                    <div className={'top-content__stars-wrapper'}>
                        {
                            [...Array(Math.floor(grade))].map((_, index) => <span key={index} className={'top-content__stars-check'}></span>)
                        }
                        {
                            [...Array(5 - Math.floor(grade))].map((_, index) => <span key={index} className={'top-content__stars-not-check'}></span>)
                        }
                    </div>

                    {grade}
                </div>
                <a href={'#'} className={'top-content__reviews'}>225 купили</a>
                <a href={'#'} className={'top-content__bought'}>DaChao Tech Store (Рейтинг 96.4%)</a>
            </div>
            <div className={'top-content__info-right'}>
                <TopSlider />
                <TopInfo productId={1} price={950} oldPrice={1200} discount={25} typeArray={productType}/>
            </div>
        </div>
    );
};

export default TopContent;