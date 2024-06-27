import React, { useState, useEffect } from 'react';
import {createUser} from "../database/db";

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handler für Änderungen in den Eingabefeldern
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Passwort überprüfen
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten!');
            return setError('Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten.');
        }
        try {
            const userData = {
                firstName,
                lastName,
                username,
                password
            };

            // Aufruf der createUser-Funktion aus frontend.js, um den Benutzer zu erstellen
            const response = await createUser(userData);

            // Erfolgsmeldung anzeigen und Zustände zurücksetzen
            setFirstName('');
            setLastName('');
            setUsername('');
            setPassword('');
            alert(response.message || 'Benutzer erfolgreich registriert!');
        } catch (error) {
            setError(error.message || 'Serverfehler');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-surface0 shadow-md rounded-lg text-text">
                <h2 className="text-2xl font-bold mb-4">Registrierung</h2>
                <div className="mb-4">
                    <label>Vorname:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nachname:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Benutzername:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Passwort:</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"

                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">Registrieren</button>
            </form>

        </div>
    );
};

export default Register;