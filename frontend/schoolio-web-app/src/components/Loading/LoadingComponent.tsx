import React, {useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import colors from '../../colors';



const LoadingComponent = () => {
    const [color,setColor] = useState('');

    useEffect(() => {
        const colorValues = Object.values(colors);
        setColor(colorValues[Math.floor(Math.random() * colorValues.length)])
    }, []);

    return (
        <div className='d-flex justify-content-center'>
            <ReactLoading type='bubbles' color={color} />
        </div>
    );
};

export default LoadingComponent;