import React from 'react';
import logo from "../../assets/tumbleweed.webp";

const LogoTumbleweed = ({className = ""}) => {
    return (
        <>
            <img className={className} src={logo} alt="logo" />
        </>
    );
};

export default LogoTumbleweed;