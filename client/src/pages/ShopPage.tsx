import React from 'react';
import SellerAbout from "../Components/Seller/SellerAbout";
import SellerGrade from "../Components/Seller/SellerGrade";
import SellerDevices from "../Components/Seller/SellerDevices";

const ShopPage = () => {
    return (
        <div className={'content'}>
            <SellerAbout />
            {/*<SellerGrade />*/}
            <SellerDevices />
        </div>
    );
};

export default ShopPage;