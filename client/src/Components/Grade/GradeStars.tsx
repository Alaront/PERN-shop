import React from 'react';

import './index.sass'

interface Grade {
    grade: number
}

const GradeStars = ({grade}: Grade) => {
    return (
        <div className={'grade-stars'}>
            {
                [...Array(Math.floor(grade))].map((_, index) => <span key={index} className={'grade-stars__stars-check'}></span>)
            }
            {
                [...Array(5 - Math.floor(grade))].map((_, index) => <span key={index} className={'grade-stars__stars-not-check'}></span>)
            }
        </div>
    );
};

export default GradeStars;