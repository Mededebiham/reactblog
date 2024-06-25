
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>3M-Blog</h1>
            <p>Willkommen</p>
            <Link to="/register">Registrieren</Link>
            <Link to="/login">Anmelden</Link>
            <Link to="/posts">Beiträge lesen</Link>
        </div>
    );
};

export default HomePage;
