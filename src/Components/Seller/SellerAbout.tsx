import React from 'react';
import watchPhoto from "../../images/products/watch.png";

import './index.sass'

const SellerAbout = () => {
    return (
        <div className={'seller-about'}>
            <div className={'seller-about__photo'}>
                <img src={watchPhoto} alt={'photo'} />
            </div>
            <div className={'seller-about__text'} >
                <h2 className={'seller-about__title'}>Seller number oNe</h2>
                <p className={'seller-about__description'}>Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em Lorem LoremL oremLo remL oremLor emLoremLo remL oremL oremLor em</p>
                <ul className={'seller-about__info-list'}>
                    <li className={'seller-about__info-list--email'}><span>Email: </span>test@mail.ru</li>
                    <li className={'seller-about__info-list--phone'}><span>Телефон: </span>+7 (093) - 237 - 20 - 32</li>
                    <li className={'seller-about__info-list--country'}><span>Страна: </span>UK</li>
                </ul>
            </div>
        </div>
    );
};

export default SellerAbout;