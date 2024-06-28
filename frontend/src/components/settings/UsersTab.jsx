import React, { useState, useEffect } from 'react';
import UserIcon from "../logos/UserIcon";
import { getUsers, updateUser, deleteUser } from '../../database/db';

const roles = {
    'admin': { name: "Administrator", color: 'bg-red' },
    'mod': { name: "Moderator", color: 'bg-mauve' },
    'user': { name: "Benutzer", color: 'bg-green' },
};

const UsersTab = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const updatedUser = users.find(user => user._id === userId);
            updatedUser.role = newRole;
            await updateUser(updatedUser);
            setUsers(users.map(user => (user._id === userId ? updatedUser : user)));
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="relative overflow-x-auto rounded-lg w-full">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-surface1">
                    <label htmlFor="table-search" className="sr-only">Suche</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-text dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block pt-2 ps-10 text-sm text-text border border-surface1 rounded-lg w-80 bg-mantle"
                            placeholder="Nach Benutzer suchen"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-text">
                    <thead className="text-xs text-surface2 uppercase bg-base">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Rolle</th>
                        <th scope="col" className="px-6 py-3">Aktion</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user._id} className="bg-surface0 border-b hover:bg-mantle">
                            <th scope="row" className="flex items-center px-6 py-4 text-text whitespace-nowrap">
                                <UserIcon className="w-10 h-10 rounded-full" />
                                <div className="ps-3">
                                    <div className="text-text font-semibold">{user.firstname} {user.lastname}</div>
                                    <div className="font-normal text-overlay1">{user.username}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className={`h-2.5 w-2.5 rounded-full ${roles[user.role].color} me-2`}></div>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="border bg-mantle text-text rounded px-2 py-1"
                                    >
                                        {Object.keys(roles).map((key) => (
                                            <option key={key} value={key}>
                                                {roles[key].name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col items-end">
                                    <a
                                        href="#"
                                        type="button"
                                        data-modal-target="editUserModal"
                                        data-modal-show="editUserModal"
                                        className="font-medium text-blue hover:text-yellow"
                                    >
                                        Bearbeiten
                                    </a>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="font-medium text-red hover:text-yellow"
                                    >
                                        Löschen
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersTab;
