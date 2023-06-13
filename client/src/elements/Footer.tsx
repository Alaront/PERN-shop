import React, {useState} from 'react';

import '../styles/footer.sass';
import FooterItem from "../Components/Footer/FooterItem";

export interface itemData {
    id: number,
    title: string,
    link: string,
    target: "_self" | "_blank"
}

const Footer = () => {
    const [buyersData, setBuyersData] = useState<itemData[]>([
        {
            id: 0,
            link: '/special/howMakeOrder',
            title: 'Как сделать заказ',
            target: "_self"
        },
        {
            id: 1,
            link: '/special/paymentMethods',
            title: 'Способы оплаты',
            target: "_self"
        },
        {
            id: 2,
            link: '/special/delivery',
            title: 'Доставка',
            target: "_self"
        },
        {
            id: 3,
            link: '/special/purchaseReturns',
            title: 'Возврат товара',
            target: "_self"
        },
        {
            id: 6,
            link: '/special/sellingRules',
            title: 'Правила продажи',
            target: "_self"
        },
        {
            id: 7,
            link: '/special/rulesUsing',
            title: 'Правила пользования торговой площадкой',
            target: "_self"
        },
    ])
    const [companyData, setCompanyData] = useState<itemData[]>([
        {
            id: 0,
            link: '/special/aboutAs',
            title: 'О нас',
            target: "_self"
        },
        {
            id: 1,
            link: '/special/paymentMethods',
            title: 'Реквизиты',
            target: "_self"
        },
        {
            id: 2,
            link: '/special/howMakeOrder',
            title: 'Пресс-центр',
            target: "_self"
        },
        {
            id: 3,
            link: '/special/howMakeOrder',
            title: 'Контакты',
            target: "_self"
        }
    ])
    const [partnersData, setPartnersData] = useState<itemData[]>([
        {
            id: 0,
            link: '/special/sellingRules',
            title: 'Продавайте на PERN SHOP',
            target: "_self"
        },
        {
            id: 1,
            link: '/special/rulesUsing',
            title: 'Курьерам',
            target: "_self"
        },
        {
            id: 2,
            link: '/special/rulesUsing',
            title: 'Перевозчикам',
            target: "_self"
        },
        {
            id: 3,
            link: '/special/delivery',
            title: 'Партнерский пункт выдачи',
            target: "_self"
        },
        {
            id: 4,
            link: '/special/delivery',
            title: 'Франшизный пункт выдачи',
            target: "_self"
        }
    ])
    const [socialData, setSocialData] = useState<itemData[]>([
        {
            id: 0,
            link: 'https://vk.com/',
            title: 'ВКонтакте',
            target: "_blank"
        },
        {
            id: 1,
            link: 'https://ok.ru/',
            title: 'Одноклассники',
            target: "_blank"
        },
        {
            id: 2,
            link: 'https://www.youtube.com/',
            title: 'YouTube',
            target: "_blank"
        },
        {
            id: 3,
            link: 'https://web.telegram.org/',
            title: 'Телеграм',
            target: "_blank"
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
