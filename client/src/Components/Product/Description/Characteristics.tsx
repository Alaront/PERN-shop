import React, {useState} from 'react';
import {deviceCharacteristicItem} from "../../../helpers/interfaces";

interface CharacteristicsI {
    listCharacteristics: Array<deviceCharacteristicItem>
}

const Characteristics = ({listCharacteristics}: CharacteristicsI) => {
    const [characteristicsOpen, setCharacteristicsOpen] = useState<boolean>(false)

    return (
        <div className={'description-product__characteristics'}>
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
            <span className={'description-product__btn-info'} onClick={() => setCharacteristicsOpen(!characteristicsOpen)}>Открыть характеристики</span>
        </div>
    );
};

export default Characteristics;