import React, { useState } from 'react';

const UserSettingsTab = () => {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
        email: '',
        darkMode: false
    });

    const [errors, setErrors] = useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleDarkModeToggle = () => {
        setFormData({
            ...formData,
            darkMode: !formData.darkMode
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setErrors('Passwörter stimmen nicht überein.');
            return;
        }

        console.log('Form submitted:', formData);

        setFormData({
            password: '',
            newPassword: '',
            confirmPassword: '',
            email: '',
            darkMode: formData.darkMode // Behält den aktuellen Dark Mode bei
        });
        setErrors('');
    };

    return (


        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">User Settings</h2>
            <div className="mb-4">
                <label htmlFor="password" className="block text-text">Current Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New
                    Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
            </div>

            {/* Change Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">New Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="darkModeToggle"
                    checked={formData.darkMode}
                    onChange={handleDarkModeToggle}
                    className="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-400"
                />
                <label htmlFor="darkModeToggle" className="ml-2 text-sm text-gray-700">Default Dark Mode</label>
            </div>

            {errors && <p className="text-red-500">{errors}</p>}

            <button type="submit" className="btn-primary w-full mt-4">Save Changes</button>
        </form>
)
    ;
};

export default UserSettingsTab;
