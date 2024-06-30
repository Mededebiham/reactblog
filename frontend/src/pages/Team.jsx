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
        <div className="">
            <h1>Unser Team</h1>
            <div>
                {admins.map((admin, index) => (
                    <div key={index} >
                        <img
                            src={admin.profilepicture || 'default-image-path'}
                            alt={`${admin.firstname} ${admin.lastname}'s profile`}

                        />
                        <div className="p-6">
                            <h2>{admin.firstname} {admin.lastname}</h2>
                            <h3 >{admin.role}</h3>
                            <p>{admin.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
