import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";

interface DescriptionInfoI {
    descriptionInfo: string
}

const DescriptionInfoBlock = ({descriptionInfo}: DescriptionInfoI) => {
    const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false)
    console.log(descriptionInfo)
    return (
        <div className={`description-product__info ${descriptionOpen && descriptionInfo.length > 150 ? 'info-open' : ''}`}>
            <ReactMarkdown children={descriptionInfo} />
            {
                descriptionInfo.length > 150 && <span className={'description-product__btn-info'} onClick={() => setDescriptionOpen(!descriptionOpen)}>{descriptionOpen ? 'Скрыть' : 'Показать'} описание</span>
            }
        </div>
    );
};

export default DescriptionInfoBlock;