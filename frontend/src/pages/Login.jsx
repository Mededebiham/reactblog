import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../database/db';
import { UserContext } from '../context';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credentials = { username, password };
            const res = await loginUser(credentials);
            console.log('Login response:', res); // Debug: Check the response
            setMessage(res.message);
            console.log('Before setting user:', res.user); // Debug: Before updating context
            setUser(res.user); // Update user context with the logged-in user
            console.log('After setting user:', res.user); // Debug: After updating context
            navigate('/');
        } catch (error) {
            setMessage(error.message || 'Fehler beim Einloggen');
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
