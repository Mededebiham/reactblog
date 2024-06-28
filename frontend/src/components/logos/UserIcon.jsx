import React, { useState, useEffect } from 'react';
import unknown from '../../assets/unknown.jpg';
import { getUserById } from '../../database/db';

const classNamesDefault = "object-cover";

const UserIcon = ({ className = "", userId }) => {
    const [imageSrc, setImageSrc] = useState(unknown);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const user = await getUserById(userId);
                setImageSrc(user.profilepicture || unknown);
            } catch (error) {
                console.error(error);
                setError('Failed to load image');
                setImageSrc(unknown);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            setLoading(true);
            fetchUserImage();
        }
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <img src={imageSrc} alt="User Icon" className={`${classNamesDefault} ${className}`} />
    );
};

export default UserIcon;
