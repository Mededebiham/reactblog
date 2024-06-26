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
            darkMode: formData.darkMode
        });
        setErrors('');
    };

    return (


        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">User Settings</h2>
            <div className="mb-4">
                <label htmlFor="password" className="block text-text">Aktuelles Passwort:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="newPassword" className="block text-text">Neue Passwort:</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-text">Bestätige neues Passwort:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-text">Neue Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                    required
                />
            </div>

            {}
            <div className="mb-4">
                <label htmlFor="darkModeToggle" className="block text-text">Dark mode als standard festlegen</label>
                <input
                    type="checkbox"
                    id="darkModeToggle"
                    checked={formData.darkMode}
                    onChange={handleDarkModeToggle}
                    className=" p-3 border border-surface1 bg-surface2 rounded mt-1"
                />
            </div>

            {errors && <p className="text-red-500">{errors}</p>}

            <button type="submit" className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">Änderungen speichern</button>
        </form>
)
    ;
};

export default UserSettingsTab;
