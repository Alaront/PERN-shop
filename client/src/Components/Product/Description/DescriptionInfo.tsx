import React, {useRef, useState} from 'react';
import ReactMarkdown from "react-markdown";

import './markDown.sass'

interface DescriptionInfoI {
    descriptionInfo: string
}

const DescriptionInfoBlock = ({descriptionInfo}: DescriptionInfoI) => {
    const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);

    const scrollToRef = useRef<HTMLParagraphElement | null>(null);

    const clickBtn = () => {
        setDescriptionOpen(!descriptionOpen);
        scrollToRef.current?.scrollIntoView();
    }

    return (
        <div className={`description-product__info ${descriptionOpen && descriptionInfo.length > 150 ? 'info-open' : ''}`}  ref={scrollToRef}>
            <p className={'description-product__title'}>Описание продукта</p>
            <div className={'mark-down'}>
                <ReactMarkdown children={descriptionInfo} />
            </div>
            {
                descriptionInfo.length > 150 && <span className={`description-product__btn-info ${descriptionOpen ? 'open-info' : ''}`} onClick={() => clickBtn()}>{descriptionOpen ? 'Скрыть' : 'Показать'} описание</span>
            }
        </div>
    );
};

export default DescriptionInfoBlock;