import React, { createContext, useState } from 'react';

const UserContext = createContext();

const initialUserState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    role: null,
    profilePicture: null,
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialUserState);

    const setUserState = (newUser) => {
        if (isValidUser(newUser)) {
            setUser(newUser);
        } else {
            console.error('Invalid user object structure');
        }
    };

    const setRole = (role) => {
        if (['user', 'mod', 'admin'].includes(role)) {
            setUser({ ...user, role });
        } else {
            setUser({ ...user, role: null });
        }
    };

    const isValidUser = (userObj) => {
        const keys = ['id', 'firstName', 'lastName', 'email', 'password', 'role', 'profilePicture'];
        return keys.every(key => key in userObj);
    };

    return (
        <UserContext.Provider value={{ user, setUser: setUserState, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider, initialUserState };
