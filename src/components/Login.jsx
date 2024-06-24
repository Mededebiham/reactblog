import React, { useState, useEffect } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 400) {
                setErrors('Diese E-Mail-Adresse ist nicht registriert oder das Passwort ist falsch.');
                return;
            }

            if (!response.ok) {
                setErrors('Fehler bei der Anmeldung.');
                return;
            }

            alert('Anmeldung erfolgreich!');
        } catch (error) {
            setErrors('Fehler bei der Anmeldung.');
        }
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
