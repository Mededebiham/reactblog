// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { downloadImage } from '../db';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const imageId = 'your_image_id'; // Replace with actual image ID
                const imageUrl = await downloadImage(imageId);
                setProfileImage(imageUrl);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };
        fetchProfileImage();
    }, []);

    return (
        <div>
            {profileImage && <img src={profileImage} alt="Profile" />}
        </div>
    );
};

export default Profile;
