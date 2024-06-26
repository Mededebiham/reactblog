import React from 'react';

const defaultClasses = 'inline-block p-4 border-b-2 rounded-t-lg';

const SettingsTabSelector = ({children, id, classNames = "", onClick = null}) => {
    return (
        <li className="me-2" role="presentation">
            <button className={`${defaultClasses} ${classNames}`} id={`${id}-tab`}
                    data-tabs-target={`#${id}`} type="button" role="tab" aria-controls={id}
                    aria-selected="false" onClick={onClick}>{children}
            </button>
        </li>
    );
};

export default SettingsTabSelector;