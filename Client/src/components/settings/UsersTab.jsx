import React, {useState} from 'react';

const UsersTab = ({ users, addUser, deleteUser, editUser }) => {
    const [newUser, setNewUser] = useState({ name: '', role: 'User' });
    const [editingUser, setEditingUser] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    const handleAddUser = () => {
        addUser(newUser);
        setNewUser({ name: '', role: 'User' });
    };

    const handleEditUser = () => {
        editUser(editingUser);
        setEditingUser(null);
    };

    return (
        <div>
            <table className="min-w-full bg-surface2 text-text border">
                <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Role</th>
                    <th className="py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id} className="text-center border ">
                            <td className="py-2">{user.id}</td>
                            <td className="py-2">{user.name}</td>
                            <td className="py-2">{user.role}</td>
                            <td className="py-2">
                                <button
                                    className="button"
                                    onClick={() => setEditingUser(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="button"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr className="text-center border">
                        <td className="py-2">User Id </td>
                        <td className="py-2">User Name </td>
                        <td className="py-2">User Role </td>
                        <td className="py-2">
                            <button  className="button">
                                Edit
                            </button>
                            <button className="button">Delete
                            </button>
                        </td>
                    </tr>

                )}
                </tbody>
            </table>
            <div className="mt-5">
                <h2 className="header2">{editingUser ? 'Edit User' : 'Add User'}</h2>
                <input
                    type="text"
                    name="name"
                    value={editingUser ? editingUser.name : newUser.name}
                    onChange={editingUser ? handleEditInputChange : handleInputChange}
                    className="input"
                    placeholder="Name"
                />
                <select
                    name="role"
                    value={editingUser ? editingUser.role : newUser.role}
                    onChange={editingUser ? handleEditInputChange : handleInputChange}
                    className="input"
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                </select>
                <button
                    className="button"
                    onClick={editingUser ? handleEditUser : handleAddUser}
                >
                    {editingUser ? 'Update User' : 'Add User'}
                </button>
            </div>
        </div>
    );
};

export default UsersTab;