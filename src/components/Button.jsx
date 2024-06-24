import React from 'react';

const defaultStyles = "text-base bg-blue hover:bg-sapphire focus:ring-2 focus:ring-green font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none";

const Button = ({ children, onClick, className = "", type = "button" }) => {
    const combinedClassName = `${defaultStyles} ${className}`.trim();
    return (
        <button type={type} className={combinedClassName} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;