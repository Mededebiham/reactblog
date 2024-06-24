import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleLogin = () => {
        setIsLoggedIn(prevState => !prevState);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, toggleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
