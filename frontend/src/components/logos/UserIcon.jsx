import React from 'react';
import defaultImage from '../../assets/unknown.jpg'; // Ensure this path is correct

const UserIcon = ({ className = "", src }) => {
    // Use the provided src if available, otherwise fallback to defaultImage
    const imagePath = src || defaultImage;

    return (
        <img src={imagePath} alt="User Icon" className={className} />
    );
};

export default UserIcon;
