import React from 'react';
import {NavLink} from "react-router-dom";

const styles = {
    active: "block py-2 px-3 text-blue rounded md:p-0",
    inactive: "block py-2 px-3 md:p-0 rounded hover:text-yellow",
}

const Link = ({to, children, className = ''}) => {
    return (
        <NavLink to={to}
        className={`${({isActive}) => isActive ? styles.active : styles.inactive} ${className}`} end>
            {children}
        </NavLink>
    );
};

export default Link;