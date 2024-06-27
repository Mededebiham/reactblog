import React, { useState } from 'react';
const API_BASE_URL = 'http://localhost:5001/api';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch.post(`${API_BASE_URL}/users/login`, {
                username,
                password,
            });
            setMessage(res.data.message);
            // Weiterleitung oder andere Aktionen bei erfolgreichem Login
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Anmelden</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-surface0 shadow-md rounded-lg text-text">
                <label>Benutzername:</label>
                <input
                    type="text"
                    className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
