import React from 'react';
import './index.sass'

interface ICheckComponent {
    state: boolean,
    changeFunction: Function
}

const CheckComponent = ({state, changeFunction}: ICheckComponent) => {
    return (
        <div className={`check-block ${state ? 'check-block--check' : ''}`} onClick={() => changeFunction()}>

        </div>
    );
};

export default CheckComponent;