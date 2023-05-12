import React, {useRef, useState} from 'react';
import {deviceCharacteristicItem} from "../../../helpers/interfaces";

interface CharacteristicsI {
    listCharacteristics: Array<deviceCharacteristicItem>
}

const Characteristics = ({listCharacteristics}: CharacteristicsI) => {
    const [characteristicsOpen, setCharacteristicsOpen] = useState<boolean>(false)

    const scrollToRef = useRef<HTMLParagraphElement | null>(null);

    const clickBtn = () => {
        setCharacteristicsOpen(!characteristicsOpen);
    }

    return (
        <div className={'description-product__characteristics'} ref={scrollToRef}>
            <p className={'description-product__title'}>Характеристики продукта</p>
            <div className={`description-product__characteristics-wrapper ${characteristicsOpen ? 'characteristics-open' : ''}`}>
                {
                    listCharacteristics && listCharacteristics.map(item => (
                        <dl key={item.id}>
                            <dt><span>{item.title}</span></dt>
                            <dd>{item.description}</dd>
                        </dl>
                    ))
                }
            </div>
            <span className={`description-product__btn-info ${characteristicsOpen ? 'open-info' : ''}`} onClick={() => clickBtn()}>Открыть характеристики</span>
        </div>
    );
};

export default Characteristics;