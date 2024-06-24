import React, { useState, useEffect } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(savedUsers);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors('');

        const user = users.find(user => user.email === formData.email);
        if (!user) {
            setErrors('Diese E-Mail-Adresse ist nicht registriert. Bitte registrieren Sie sich.');
            return;
        }

        if (user.password !== formData.password) {
            setErrors('Falsches Passwort.');
            return;
        }

        alert('Anmeldung erfolgreich!');
    };

    return (
        <div>
            <h2>Anmeldung</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Passwort:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                {errors && <p style={{ color: 'red' }}>{errors}</p>}
                <button type="submit">Anmelden</button>
            </form>
            <p>Noch keinen Account? <a href="/register">Registrieren</a></p>
        </div>
    );
};

export default Login;
