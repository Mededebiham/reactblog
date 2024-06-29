import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserIcon from "../components/logos/UserIcon";
import { getUserById } from "../database/db";
import { toTitleCase } from "../utils/utils";
import LogoTumbleweed from "../components/logos/LogoTumbleweed";

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
        <div className="w-full bg-mantle border border-surface1 rounded-lg shadow h-min m-8">
            <div className="flex flex-col items-center pb-10 mt-8 m-4">
                <UserIcon className="w-32 h-32 mb-3 rounded-xl shadow-lg" userId={user._id} />
                <h5 className="mb-1 text-xl font-medium text-text">{`${toTitleCase(user.firstname)} ${toTitleCase(user.lastname)}`}</h5>
                <span className="text-sm text-overlay2 mt-2">{user.username}</span>
                <div className="text-sm text-overlay2 mt-8 text-center">
                    {user.description ? (
                        <div dangerouslySetInnerHTML={{ __html: user.description }} />
                    ) : (
                        <div className="flex flex-col items-center">
                            <p className="mb-4">
                                <span className="text-text font-medium">
                                    {user.firstname ? toTitleCase(user.firstname) : "Der Benutzer"}
                                </span> hat noch keine Beschreibung hinzugefügt 😢
                            </p>
                            <LogoTumbleweed className="object-contain h-40 w-40 rounded-full shadow-inner" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;
