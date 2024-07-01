import React, { useEffect, useState } from 'react';
import { getUsers } from '../database/db';
import {toTitleCase} from "../utils/utils";
import UserIcon from "../components/logos/UserIcon";

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
        <div className=" py-10 p-6 rounded-lg shadow-lg">
            <h2 className="header2 text-center">Die drei M's</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {admins.map((admin, index) => (
                    <div key={index} className="bg-mantle p-6 rounded-xl shadow-xl">
                        <UserIcon userId={admin._id} className="w-full h-auto max-w-xs mx-auto rounded-xl" />
                        <div className="p-2 text-center">
                            <h2 className="header2">{toTitleCase(admin.firstname)} {toTitleCase(admin.lastname)}</h2>
                            <div className="label" dangerouslySetInnerHTML={{ __html: admin.description }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
