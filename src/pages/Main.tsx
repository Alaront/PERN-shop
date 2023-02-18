import React from 'react';
import AdSlider from "../Components/AdSlider/AdSlider";
import AdOffer from "../Components/AdOffers/AdOffers";

const Main = () => {
    return (
        <div className={'content'}>
            <AdSlider />
            <AdOffer />
        </div>
    );
};

export default Main;