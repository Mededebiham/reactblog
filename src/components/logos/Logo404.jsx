import React from 'react';
import logo from '../../assets/404.gif';


const Logo404 = ({className = ""}) => {
    return (
        <>
            <img className={className} src={logo} alt="logo" />
        </>
    );
};

export default Logo404;