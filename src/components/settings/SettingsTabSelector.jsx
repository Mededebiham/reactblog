import React from 'react';

const defaultClasses = 'inline-block p-4 border-b-2 rounded-t-lg';

const SettingsTabSelector = ({ children, id, classNames = "", isActive = false, onClick = null }) => {
    const activeClasses = isActive ? 'text-blue border-blue' : 'text-text border-transparent hover:text-yellow';
    return (
        <div className="mx-1" role="presentation">
            <button
                className={`${defaultClasses} ${activeClasses} ${classNames}`}
                id={`${id}-tab`}
                data-tabs-target={`#${id}`}
                type="button"
                role="tab"
                aria-controls={id}
                aria-selected={isActive}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
};

export default SettingsTabSelector;
