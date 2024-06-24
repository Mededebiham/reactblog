import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from "./components/Navbar";
import ContentRoute from "./components/ContentRoute";

const isLoggedIn = React.createContext(false);

export const clearLocalStorage = () => {
    localStorage.removeItem('users');
};
function App() {
    const handleLogout = () => {
        // Hier rufst du die Funktion zum Löschen auf
        clearLocalStorage();
        // Optional: Weiterleitung zur Login-Seite oder einer anderen Seite
    };
  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
        <ContentRoute />
      </div>
    </Router>
  );
}

export default App;
