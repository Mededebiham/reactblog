import React, { useState } from 'react';
import { createUser } from '../database/db';
import { useNavigate } from 'react-router-dom';
import { passwordRegex } from '../utils/utils';
import Button from "../components/parts/Button";

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

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
            case 'repeatPassword':
                setRepeatPassword(value);
                break;
            case 'terms':
                setTermsAccepted(e.target.checked);
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
        if (password !== repeatPassword) {
            setError('Die Passwörter stimmen nicht überein.');
            return;
        }
        if (!termsAccepted) {
            setError('Sie müssen den Bedingungen und Konditionen zustimmen.');
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
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 shadow-md rounded-lg bg-mantle">
                <h2 className="text-2xl font-bold mb-4 text-text">Registrierung</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-5">
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                        placeholder="Vorname"
                        value={firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                        placeholder="Nachname"
                        value={lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                        placeholder="Benutzername"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                        placeholder="Passwort"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="password"
                        id="repeatPassword"
                        name="repeatPassword"
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                        placeholder="Passwort wiederholen"
                        value={repeatPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-surface1 rounded bg-surface2"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-text">Ich stimme den <a href="#" className="text-blue hover:text-yellow">AGB</a> zu</label>
                </div>
                <Button type="submit" className="w-full mb-0">Registrieren</Button>
            </form>
        </div>
    );
};

export default Register;
