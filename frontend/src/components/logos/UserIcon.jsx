import React from 'react';
import unknown from '../../assets/unknown.jpg';

const UserIcon = ({className = ""}) => {
    return (
        <img src={unknown} alt="NA" className={className}/>
    );
};

export default UserIcon;