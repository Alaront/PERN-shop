import React, {useRef, useState} from 'react';
import ReactMarkdown from "react-markdown";

import './markDown.sass'

interface DescriptionInfoI {
    descriptionInfo: string
}

const DescriptionInfoBlock = ({descriptionInfo}: DescriptionInfoI) => {
    const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);
    const [descriptionHeight, setDescriptionHeight] = useState(100);

    const maxHeightRef = useRef<HTMLParagraphElement | null>(null);

    const clickBtn = () => {
        setDescriptionHeight(!descriptionOpen && maxHeightRef.current?.clientHeight ? maxHeightRef.current?.clientHeight : 100)
        setDescriptionOpen(!descriptionOpen);
    }

    return (
        <div className={`description-product__info ${descriptionOpen && descriptionInfo.length > 150 ? 'info-open' : ''}`} >
            <p className={'description-product__title'}>Описание продукта</p>
            <div className={`mark-down ${descriptionInfo.length > 150 ? 'mark-down--after' : ''}`} style={{maxHeight: descriptionHeight}}>
                <div className={'mark-down-wrapper'}  ref={maxHeightRef}>
                    <ReactMarkdown children={descriptionInfo} />
                </div>
            </div>
            {
                descriptionInfo.length > 150 && <span className={`description-product__btn-info ${descriptionOpen ? 'open-info' : ''}`} onClick={() => clickBtn()}>{descriptionOpen ? 'Скрыть' : 'Показать'} описание</span>
            }
        </div>
    );
};

export default DescriptionInfoBlock;