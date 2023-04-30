import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";

import './markDown.sass'

interface DescriptionInfoI {
    descriptionInfo: string
}

const DescriptionInfoBlock = ({descriptionInfo}: DescriptionInfoI) => {
    const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false)

    return (
        <div className={`description-product__info ${descriptionOpen && descriptionInfo.length > 150 ? 'info-open' : ''}`}>
            <div>
                <ReactMarkdown children={descriptionInfo} />
            </div>
            {
                descriptionInfo.length > 150 && <span className={'description-product__btn-info'} onClick={() => setDescriptionOpen(!descriptionOpen)}>{descriptionOpen ? 'Скрыть' : 'Показать'} описание</span>
            }
        </div>
    );
};

export default DescriptionInfoBlock;