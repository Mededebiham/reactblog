import React, { useEffect, useState, useRef } from 'react';
import UserIcon from "../logos/UserIcon";
import Pagination from "../Pagination";
import { deleteUser, getUsers, updateUser } from '../../database/db';
import Link from "../parts/Link";

const roles = {
    'admin': { name: "Administrator", color: 'bg-red' },
    'mod': { name: "Moderator", color: 'bg-mauve' },
    'user': { name: "Benutzer", color: 'bg-green' },
};

const UsersTab = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUserId, setEditingUserId] = useState(null);
    const usersPerPage = 10;
    const tableRef = useRef();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                fetchedUsers.sort((a, b) => a.lastname.localeCompare(b.lastname));
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editingUserId && tableRef.current && !tableRef.current.contains(event.target)) {
                setEditingUserId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingUserId]);

    const handleEditToggle = (userId) => {
        setEditingUserId(editingUserId === userId ? null : userId);
    };

    const handleInputChange = (userId, field, value) => {
        setUsers(users.map(user =>
            user._id === userId ? { ...user, [field]: value } : user
        ));
    };

    const handleSave = async (userId) => {
        try {
            const userToUpdate = users.find(user => user._id === userId);
            const res = await updateUser(userToUpdate);
            setUsers(users.map(user => (user._id === userId ? res : user)));
            setEditingUserId(null);
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Fehler beim Speichern der Änderungen.');
        }
    };

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
        const confirmDelete = window.confirm("Benutzer wirklich löschen?");
        if (!confirmDelete) return;

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

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div ref={tableRef} className="relative overflow-x-auto rounded-lg w-full bg-surface1 p-6">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-surface1">
                <label htmlFor="table-search" className="sr-only">Suche</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-text dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-text border border-surface1 rounded-lg w-80 bg-mantle" placeholder="Nach Benutzer suchen" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-text">
                <thead className="text-xs text-surface2 uppercase bg-base">
                <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Rolle</th>
                    <th scope="col" className="px-6 py-3 text-right">Aktion</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map(user => (
                    <tr key={user._id} className="bg-surface0 border-b hover:bg-mantle">
                        <th scope="row" className="flex items-center px-6 py-4 text-text whitespace-nowrap">
                            {editingUserId === user._id ? (
                                <div className="flex">
                                    <UserIcon className="w-10 h-10 rounded-full" userId={`${user._id}`} />
                                    <div className="ps-3">
                                        <div className="flex text-text font-semibold">
                                            <input className="bg-surface2 px-1 mr-1 border border-surface1 rounded" value={user.firstname} onChange={(e) => handleInputChange(user._id, 'firstname', e.target.value)} />
                                            <input className="bg-surface2 px-1 border border-surface1 rounded" value={user.lastname} onChange={(e) => handleInputChange(user._id, 'lastname', e.target.value)} />
                                        </div>
                                        <div className="font-normal text-overlay1">
                                            <input className="bg-surface2 px-1 border border-surface1 rounded text-text" value={user.username} onChange={(e) => handleInputChange(user._id, 'username', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link className="flex" to={`/user/${user._id}`}>
                                    <UserIcon className="w-10 h-10 rounded-full" userId={`${user._id}`} />
                                    <div className="ps-3">
                                        <div className="flex text-text font-semibold">
                                            <div className="mr-1">{user.firstname}</div>
                                            <div>{user.lastname}</div>
                                        </div>
                                        <div className="font-normal text-overlay1">{user.username}</div>
                                    </div>
                                </Link>
                            )}
                        </th>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full ${roles[user.role].color} me-2`}></div>
                                <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)} className="border bg-mantle text-text rounded px-2 py-1">
                                    {Object.keys(roles).map((key) => (
                                        <option key={key} value={key}>{roles[key].name}</option>
                                    ))}
                                </select>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex flex-col items-end">
                                {editingUserId === user._id ? (
                                    <>
                                        <button onClick={() => handleSave(user._id)} className="font-medium text-blue hover:text-yellow">Speichern</button>
                                        <button onClick={() => setEditingUserId(null)} className="font-medium text-red hover:text-yellow">Abbrechen</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditToggle(user._id)} className="font-medium text-blue hover:text-yellow">Bearbeiten</button>
                                        <button onClick={() => handleDeleteUser(user._id)} className="font-medium text-red hover:text-yellow">Löschen</button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default UsersTab;
