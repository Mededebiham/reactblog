import React from 'react';
import logo from '../../assets/logo.webp';

const defaultClasses = 'scale-125 rounded-full hover:scale-100'

const Logo = ({className}) => {
    return (
        <img src={logo} alt="Blog Logo" className={`${defaultClasses} ${className}`}/>
    );
};

export default Logo;