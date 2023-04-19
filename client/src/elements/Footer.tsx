import React, {useState} from 'react';

import '../styles/footer.sass';
import FooterItem from "../Components/Footer/FooterItem";

export interface itemData {
    id: number,
    title: string,
    link: string
}

const Footer = () => {
    const [buyersData, setBuyersData] = useState<itemData[]>([
        {
            id: 0,
            link: '#',
            title: 'Как сделать заказ'
        },
        {
            id: 1,
            link: '#',
            title: 'Способы оплаты'
        },
        {
            id: 2,
            link: '#',
            title: 'Доставка'
        },
        {
            id: 3,
            link: '#',
            title: 'Возврат товара'
        },
        {
            id: 4,
            link: '#',
            title: 'Как сделать заказ'
        },
        {
            id: 5,
            link: '#',
            title: 'Возврат денежных средств'
        },
        {
            id: 6,
            link: '#',
            title: 'Правила продажи'
        },
        {
            id: 7,
            link: '#',
            title: 'Правила пользования торговой площадкой'
        },
        {
            id: 8,
            link: '#',
            title: 'Вопросы и ответы'
        },
    ])
    const [companyData, setCompanyData] = useState<itemData[]>([
        {
            id: 0,
            link: '#',
            title: 'О нас'
        },
        {
            id: 1,
            link: '#',
            title: 'Реквизиты'
        },
        {
            id: 2,
            link: '#',
            title: 'Пресс-центр'
        },
        {
            id: 3,
            link: '#',
            title: 'Контакты'
        }
    ])
    const [partnersData, setPartnersData] = useState<itemData[]>([
        {
            id: 0,
            link: '#',
            title: 'Продавайте на PERN SHOP'
        },
        {
            id: 1,
            link: '#',
            title: 'Курьерам'
        },
        {
            id: 2,
            link: '#',
            title: 'Перевозчикам'
        },
        {
            id: 3,
            link: '#',
            title: 'Партнерский пункт выдачи'
        },
        {
            id: 4,
            link: '#',
            title: 'Франшизный пункт выдачи'
        }
    ])
    const [socialData, setSocialData] = useState<itemData[]>([
        {
            id: 0,
            link: '#',
            title: 'ВКонтакте'
        },
        {
            id: 1,
            link: '#',
            title: 'Одноклассники'
        },
        {
            id: 2,
            link: '#',
            title: 'YouTube'
        },
        {
            id: 3,
            link: '#',
            title: 'Телеграм'
        }
    ])

    if (window.location.href.includes('admin')) {
        return <></>
    }

    return (
        <div className={'footer'}>
            <div className={'footer__wrapper'}>

               <FooterItem title={'Покупателям'} itemData={buyersData} />

               <FooterItem title={'Компания'} itemData={companyData} />

               <FooterItem title={'Партнерам'} itemData={partnersData} />

               <FooterItem title={'Мы в соцсетях '} itemData={socialData} />

            </div>
        </div>
    );
};

export default Footer;