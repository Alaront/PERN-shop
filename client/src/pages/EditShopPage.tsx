import React from 'react';
import EditMainPhoto from "../Components/editProduct/EditMainPhoto";
import EditShopContent from "../Components/editShopPage/EditShopContent";

const EditShopPage = () => {
    return (
        <div className={'content edit-product'}>
            <EditMainPhoto title={'Редактирование фотографию магазина'} type={'shopPage'}/>
            <EditShopContent />
        </div>
    );
};

export default EditShopPage;