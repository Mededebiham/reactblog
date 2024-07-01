import React, { useState, useContext } from 'react';
import { passwordRegex } from "../../utils/utils";
import { updateUser, loginUser } from '../../database/db';
import { UserContext } from '../../context';
import Button from "../parts/Button";

const UserSettingsTab = () => {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
        email: '',
    });
    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.newPassword && !formData.email) {
            setErrors('Bitte geben Sie entweder eine neue E-Mail-Adresse oder ein neues Passwort ein.');
            return;
        }

        if (formData.newPassword && formData.newPassword === user.password) {
            setErrors('Das neue Passwort darf nicht mit dem aktuellen Passwort übereinstimmen.');
            return;
        }

        if (formData.email && formData.email === user.username) {
            setErrors('Die neue E-Mail-Adresse darf nicht mit der aktuellen E-Mail-Adresse übereinstimmen.');
            return;
        }

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setErrors('Passwörter stimmen nicht überein.');
            return;
        }

        if (formData.newPassword && !passwordRegex.test(formData.newPassword)) {
            setErrors('Das neue Passwort erfüllt nicht die erforderlichen Kriterien.');
            return;
        }

        try {
            // Check if current password is correct
            const credentials = { username: user.username, password: formData.password };
            await loginUser(credentials);

            // Prepare updated user data
            const updatedUser = {
                ...user,
                password: formData.newPassword ? formData.newPassword : user.password,
                username: formData.email || user.username
            };

            // Update user
            const res = await updateUser(updatedUser);
            setUser(res);
            setErrors('');
            alert('Änderungen erfolgreich gespeichert.');
        } catch (error) {
            setErrors(error.message || 'Fehler beim Speichern der Änderungen.');
        }

        setFormData({
            password: '',
            newPassword: '',
            confirmPassword: '',
            email: '',
        });
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-96 bg-mantle p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="header2">Benutzereinstellungen</h2>

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
                        <label htmlFor="newPassword" className="label">Neues Passwort:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="label">Neues Passwort bestätigen:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="label">Neue E-Mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input placeholder-overlay1"
                            placeholder="Leer für keine Änderung"
                        />
                    </div>

                    {errors && <p className="text-red">{errors}</p>}

                    <Button type="submit" className="bg-green w-full">Änderungen speichern</Button>
                </form>
            </div>
        </div>
    );
};

export default UserSettingsTab;
