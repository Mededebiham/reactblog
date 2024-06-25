import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

const Settings = () => {
    const { userRole } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userRole) {
            navigate('/login');
        }
    }, [userRole, navigate]);

    if (!userRole) {
        return null;
    }

    return (
        <div>
            User Settings
        </div>
    );
};

export default Settings;
