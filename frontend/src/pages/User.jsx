import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserIcon from "../components/logos/UserIcon";
import { getUserById } from "../database/db";
import { toTitleCase } from "../utils/utils";

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(id);
                setUser(userData);
            } catch (error) {
                setError('Error fetching user data');
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full max-w-sm bg-mantle border border-surface1 rounded-lg shadow h-min">
            <div className="flex flex-col items-center pb-10 mt-8 m-4">
                <UserIcon className="w-24 h-24 mb-3 rounded-full shadow-lg" />
                <h5 className="mb-1 text-xl font-medium text-text">{`${toTitleCase(user.firstname)} ${toTitleCase(user.lastname)}`}</h5>
                <span className="text-sm text-overlay2 mt-2">{user.email}</span>
                <p className="text-sm text-overlay2 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    );
};

export default User;
