import React from 'react';
import AdSlider from "../Components/AdSlider/AdSlider";
import Daily from "../Components/AdOffers/Daily";
import Bestsellers from "../Components/Bestsellers/Bestsellers";
import Viewed from "../Components/Viewed/Viewed";

const Main = () => {
    return (
        <div className={'content'}>
            <AdSlider />
            <Daily />
            <Bestsellers />
            <Viewed />
        </div>
    );
};

export default Main;