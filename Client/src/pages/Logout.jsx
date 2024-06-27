import React from 'react';

const Logout = () => {

    const handleLogout = () => {
        localStorage.clear(); // Löscht alle gespeicherten Daten im localStorage
        alert('Sie haben sich erfolgreich abgemeldet!');
    };

    return (
        <div>
            <div  className="max-w-lg mx-auto p-4 bg-surface0 shadow-md rounded-lg text-text" >
                <h2 className="text-2xl font-bold mb-4">Logout</h2>
                <p>Möchten Sie sich wirklich abmelden?</p>
                <button onClick={handleLogout}  className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">Abmelden</button>
            </div>
        </div>
    );
};

export default Logout;
