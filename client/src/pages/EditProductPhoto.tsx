import React from 'react';
import EditDifferentPhoto from "../Components/editProduct/EditDifferentPhoto";
import EditMainPhoto from "../Components/editProduct/EditMainPhoto";

const EditProductPhoto = () => {


    return (
        <div className={'content add-product edit-product'}>
            <EditMainPhoto title={'Редактирование фотографий товара'} type={'device'}/>
            <EditDifferentPhoto />
        </div>
    );
};

export default EditProductPhoto;