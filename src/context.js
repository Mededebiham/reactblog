import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const initialUserState = {
    _id: null,
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    role: null,
    profilepicture: null,
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : initialUserState;
    });

    useEffect(() => {
        if (user._id) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const setUserState = (newUser) => {
        console.log('Setting user state:', newUser); // Debug: Check the new user state
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
        const requiredKeys = ['_id', 'firstname', 'lastname', 'username', 'password', 'role', 'profilepicture'];
        const valid = requiredKeys.every(key => key in userObj);
        console.log('isValidUser:', valid, userObj); // Debug: Check validation
        return valid;
    };

    return (
        <UserContext.Provider value={{ user, setUser: setUserState, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider, initialUserState };
