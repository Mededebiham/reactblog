import React, { useEffect, useState } from 'react';
import { getUsers } from '../database/db';

const Team = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const users = await getUsers();
                const adminUsers = users.filter(user => user.role === 'admin');
                setAdmins(adminUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchAdmins();
    }, []);

    return (
        <div className="bg-surface2 py-10 p-6 rounded-lg shadow-lg">
            <h2 className="header2 text-center">Unser Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {admins.map((admin, index) => (
                    <div key={index} className="bg-mantle p-6 rounded-xl shadow-xl">
                        <img
                            src={admin.profilepicture || 'default-image-path'}
                            alt={`${admin.firstname} ${admin.lastname}'s profile`}
                            className="w-full h-auto max-w-xs mx-auto rounded-xl"
                        />
                        <div className="p-2 text-center">
                            <h2 className="header2">{admin.firstname} {admin.lastname}</h2>
                            <p className="label">{admin.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Team;
