import React, {useState} from 'react';
import CartData from "../Components/Cart/CartData";
import CardAllChoosing from "../Components/Cart/CardAllChoosing";

const Cart = () => {
    const [mainCheck, setMainCheck] = useState<boolean>(false);

    const changeMainCheck = ():void => {
        setMainCheck(!mainCheck)
    }

    return (
        <div className={'content content-cart'}>
            <CartData mainCheck={mainCheck} changeMainCheck={changeMainCheck}/>
            <CardAllChoosing />
        </div>
    );
};

export default Cart;