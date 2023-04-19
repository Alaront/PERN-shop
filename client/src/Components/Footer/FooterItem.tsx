import React, {useState} from 'react';
import {itemData} from "../../elements/Footer";

interface FooterItemData {
    title: string,
    itemData: Array<itemData>
}

const FooterItem = ({itemData, title}: FooterItemData) => {
    const [openFooter, setOpenFooter] = useState<boolean>(false)

    const changeFooter = () => {
        setOpenFooter(!openFooter)
    }

    return (
        <div className={`footer__item ${openFooter ? 'footer-open' : ''}`}>
            <p className={'footer__title'} onClick={changeFooter}> {title} </p>
            <ul>
                {
                    itemData.map(item => <li key={item.id}><a className={'footer__link'} href={item.link}>{item.title}</a></li>)
                }
            </ul>
        </div>
    );
};

export default FooterItem;