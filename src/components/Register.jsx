import React, { useState, useEffect } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return passwordRegex.test(password);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setShowModal(false);

        if (!validatePassword(formData.password)) {
            setErrors('Passwort muss mindestens 10 Zeichen lang sein, einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 400) {
                setErrors('Ein Benutzer mit dieser E-Mail-Adresse existiert bereits.');
                return;
            }

            if (!response.ok) {
                setErrors('Fehler bei der Registrierung.');
                return;
            }

            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
            });
            fetchUsers();
            setShowModal(true);
            alert('Sie haben sich erfolgreich registriert!');
        } catch (error) {
            setErrors('Fehler bei der Registrierung.');
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <h2>Registrierung</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Vorname:</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Nachname:</label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Passwort:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                </div>
                {errors && <p style={{color: 'red'}}>{errors}</p>}
                <button type="submit">Registrieren</button>
            </form>

            <h3>Registrierte Benutzer</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.firstname} {user.lastname} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Register;
