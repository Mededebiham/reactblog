import React from 'react';

const Logout = () => {

    const handleLogout = () => {
        localStorage.clear(); // Löscht alle gespeicherten Daten im localStorage
        alert('Sie haben sich erfolgreich abgemeldet!');
    };

    return (
        <div>
            <h2>Logout</h2>
            <p>Möchten Sie sich wirklich abmelden?</p>
            <button onClick={handleLogout}>Abmelden</button>
        </div>
    );
};

export default Logout;
