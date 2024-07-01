import React, { useState, useContext, useEffect } from 'react';
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
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = formData.password && (
            (formData.newPassword && formData.newPassword === formData.confirmPassword && formData.newPassword !== user.password && passwordRegex.test(formData.newPassword)) ||
            (formData.email && formData.email !== user.username)
        );

        setIsFormValid(isValid);
    }, [formData, user]);

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
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 shadow-md rounded-lg bg-mantle">
                <h2 className="text-2xl font-bold mb-4 text-text">Benutzereinstellungen</h2>
                {errors && <p className="text-red-500 mb-4">{errors}</p>}
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-text">Aktuelles Passwort:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-text">Neues Passwort:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-text">Neues Passwort bestätigen:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-text">Neue E-Mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                        placeholder="Leer für keine Änderung"
                    />
                </div>
                <Button type="submit" className={`w-full mb-0 ${isFormValid ? 'bg-green' : ''}`}>Änderungen speichern</Button>
            </form>
        </div>
    );
};

export default UserSettingsTab;
