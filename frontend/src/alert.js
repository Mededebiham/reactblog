import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
};