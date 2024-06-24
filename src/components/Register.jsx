import React, { useState, useEffect } from 'react';
import Modal from './Modal';


const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
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

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors('');
        setShowModal(false);

        if (!validatePassword(formData.password)) {
            setErrors('Passwort muss mindestens 10 Zeichen lang sein, einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten.');
            return;
        }

        const userExists = users.some(user => user.email === formData.email);
        if (userExists) {
            setErrors('Ein Benutzer mit dieser E-Mail-Adresse existiert bereits.');
            return;
        }

        const newUser = { ...formData };
        const newUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(newUsers));
        setUsers(newUsers);

        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        });

        setCurrentUser(newUser);
        setShowModal(true);
        alert('Sie haben sich erfolgreich registriert!');
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

            <Modal show={showModal} handleClose={handleCloseModal}>
                <h3>Erfolgreich registriert!</h3>
            </Modal>
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
