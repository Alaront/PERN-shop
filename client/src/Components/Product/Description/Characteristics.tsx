import React, {useState} from 'react';

const Characteristics = () => {
    const [characteristicsOpen, setCharacteristicsOpen] = useState<boolean>(false)

    return (
        <div className={'description-product__characteristics'}>
            <div className={`description-product__characteristics-wrapper ${characteristicsOpen ? 'characteristics-open' : ''}`}>
                <dl>
                    <dt><span>Тип</span></dt>
                    <dd>Диетический батончик, Протеиновый батончик</dd>
                </dl>
                <dl>
                    <dt><span>Цель</span></dt>
                    <dd>Похудение/Сушка, Красота и здоровье</dd>
                </dl>
                <dl>
                    <dt><span>Количество порций</span></dt>
                    <dd>12</dd>
                </dl>
                <dl>
                    <dt><span>Условия хранения</span></dt>
                    <dd>В сухом месте</dd>
                </dl>
                <dl>
                    <dt><span>Форма выпуска спортивного питания</span></dt>
                    <dd>Батончик</dd>
                </dl>
                <dl>
                    <dt><span>Количество, шт</span></dt>
                    <dd>12</dd>
                </dl>
                <dl>
                    <dt><span>Бренд</span></dt>
                    <dd>BootyBar</dd>
                </dl>
                <dl>
                    <dt><span>Упаковка</span></dt>
                    <dd>Картонная коробка</dd>
                </dl>
                <dl>
                    <dt><span>Единиц в одном товаре</span></dt>
                    <dd>12</dd>
                </dl>
                <dl>
                    <dt><span>Не содержит</span></dt>
                    <dd>Антибиотики, Аспартам, Ацесульфам</dd>
                </dl>
                <dl>
                    <dt><span>Пол</span></dt>
                    <dd>Женский</dd>
                </dl>
                <dl>
                    <dt><span>Преимущества</span></dt>
                    <dd>Диетические конфеты, диетические батончики, конфеты без сахара</dd>
                </dl>
            </div>
            <span className={'description-product__btn-info'} onClick={() => setCharacteristicsOpen(!characteristicsOpen)}>Открыть характеристики</span>
        </div>
    );
};

export default Characteristics;