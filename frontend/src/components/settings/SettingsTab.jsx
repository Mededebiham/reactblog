import React from 'react';

const defaultClasses = 'p-4 rounded-lg';

const SettingsTab = ({ children, id, classNames = "", visible = false }) => {
    return (
        <div className={`${defaultClasses} ${classNames} ${visible ? "block" : "hidden"}`} id={id} role="tabpanel"
             aria-labelledby={`${id}-tab`}>
            <p className="text-sm text-text">{children}</p>
        </div>
    );
};

export default SettingsTab;
