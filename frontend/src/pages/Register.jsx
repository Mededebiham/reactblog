import React, { useState } from 'react';
import { createUser } from '../database/db';
import {useNavigate} from "react-router-dom";
import {passwordRegex} from "../utils/utils";

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
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

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRegex.test(password)) {
            setError('Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten.');
            return;
        }
        try {
            const userData = {
                firstname,
                lastname,
                username,
                password,
                role: 'user',
            };
            const response = await createUser(userData);

            navigate('/login');

        } catch (error) {
            setError(error.message || 'Serverfehler: ' + error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-surface0 shadow-md rounded-lg text-text">
                <h2 className="text-2xl font-bold mb-4">Registrierung</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label>Vorname:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                        name="firstname"
                        value={firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Nachname:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                        name="lastname"
                        value={lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
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
                <div className="mb-4">
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
