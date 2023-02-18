import React from 'react';
import AdSlider from "../Components/AdSlider/AdSlider";
import Daily from "../Components/AdOffers/Daily";
import Bestsellers from "../Components/Bestsellers/Bestsellers";

const Main = () => {
    return (
        <div className={'content'}>
            <AdSlider />
            <Daily />
            <Bestsellers />
        </div>
    );
};

export default Main;