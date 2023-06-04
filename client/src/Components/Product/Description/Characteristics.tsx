import React, {useRef, useState} from 'react';
import {deviceCharacteristicItem} from "../../../helpers/interfaces";

interface CharacteristicsI {
    listCharacteristics: Array<deviceCharacteristicItem>
}

const Characteristics = ({listCharacteristics}: CharacteristicsI) => {
    const [characteristicsOpen, setCharacteristicsOpen] = useState<boolean>(false)
    const [characteristicsHeight, setCharacteristicsHeight] = useState(100);
    const maxHeightRef = useRef<HTMLParagraphElement | null>(null);

    const clickBtn = () => {
        setCharacteristicsHeight(!characteristicsOpen && maxHeightRef.current?.clientHeight ? maxHeightRef.current?.clientHeight : 100)
        setCharacteristicsOpen(!characteristicsOpen);
    }

    return (
        <div className={'description-product__characteristics'} >
            <p className={'description-product__title'}>Характеристики продукта</p>
            <div
                className={`description-product__characteristics-content ${characteristicsOpen ? 'characteristics-open' : ''} ${ listCharacteristics.length > 2 ? 'description-product__characteristics--after' : ''}`}
                 style={{maxHeight: characteristicsHeight}}>

                <div className={'description-product__characteristics-wrapper'} ref={maxHeightRef}>
                    {
                        listCharacteristics && listCharacteristics.map(item => (
                            <dl key={item.id}>
                                <dt><span>{item.title}</span></dt>
                                <dd>{item.description}</dd>
                            </dl>
                        ))
                    }
                </div>
            </div>
            {
                listCharacteristics.length > 2 && <span className={`description-product__btn-info ${characteristicsOpen ? 'open-info' : ''}`} onClick={() => clickBtn()}>Открыть характеристики</span>
            }
        </div>
    );
};

export default Characteristics;