import React from 'react';
import ReactLoading from 'react-loading';
import colors from '../../colors';

const getRandomColor = () => {
    const colorValues = Object.values(colors);
    return colorValues[Math.floor(Math.random() * colorValues.length)];
};

const LoadingComponent = () => {
    return (
        <div className='d-flex justify-content-center'>
            <ReactLoading type='bubbles' color={getRandomColor()} />
        </div>
    );
};

export default LoadingComponent;