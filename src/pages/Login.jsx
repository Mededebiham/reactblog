import React, { useState, useEffect } from 'react';
import {serverPort} from "../serverConfig";

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
            const response = await fetch("http://localhost:" + serverPort + "/login", {
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

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-surface0 shadow-md rounded-lg text-text">
                <h2 className="text-2xl font-bold mb-4">Anmeldung</h2>
                <div  className="mb-4">
                    <label>Email:</label>
                    <input type="email"
                           name="email"
                           value={formData.email}
                           className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                           onChange={handleChange} required/>
                </div>
                <div>
                    <label>Passwort:</label>
                    <input type="password"
                           name="password"
                           value={formData.password}
                           className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                           onChange={handleChange} required/>
                </div>
                {errors && <p style={{color: 'red'}}>{errors}</p>}
                <button type="submit" className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">Anmelden</button>
            </form>
            <p className="text-center">Noch keinen Account? <a href="/register"   className="text-blue  mt-4">Registrieren</a></p>
        </div>
    );
};

export default Login;