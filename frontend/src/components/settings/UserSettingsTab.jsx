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
            <h2 className="header2">User Settings</h2>
            <div className="mb-4">
                <label htmlFor="password" className="label">Aktuelles Passwort:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="newPassword" className="label">Neue Passwort:</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="label">Bestätige neues Passwort:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="label">Neue Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>

            {}
            <div className="mb-4">
                <label htmlFor="darkModeToggle" className="label">Dark mode als standard festlegen</label>
                <input
                    type="checkbox"
                    id="darkModeToggle"
                    checked
                    onChange={handleDarkModeToggle}
                    className=" p-3 border border-surface1 bg-surface2 rounded mt-1"
                />
            </div>

            {errors && <p className="text-red-500">{errors}</p>}

            <button type="submit" className="button">Änderungen speichern</button>
        </form>
)
    ;
};

export default UserSettingsTab;
