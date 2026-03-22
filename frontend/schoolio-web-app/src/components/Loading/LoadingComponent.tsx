import React, {useState} from 'react';
import ReactLoading from 'react-loading';
import colors from '../../colors';



const LoadingComponent = () => {
    const colorValues = Object.values(colors);
    const [color] = useState(colorValues[Math.floor(Math.random() * colorValues.length)]);

    return (
        <div className='d-flex justify-content-center'>
            <ReactLoading type='bubbles' color={color} />
        </div>
    );
};

export default LoadingComponent;