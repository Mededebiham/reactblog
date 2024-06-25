import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    const setRole = (role) => {
        if (role === 'user' || role === 'mod' || role === 'admin') {
            setUserRole(role);
        } else {
            setUserRole(null);
        }
    };

    return (
        <UserContext.Provider value={{ userRole, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
