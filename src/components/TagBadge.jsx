import React from 'react';
import PropTypes from 'prop-types';

const classNames = "text-mantle text-sm font-medium me-2 px-2.5 py-0.5 rounded-full mb-1";

const TagBadge = ({ children, onClick, bgColor = "bg-text", className = "" }) => {
    const styles = `${bgColor} ${classNames} ${className}`;

    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (onClick) {
            onClick(event);
        }
    };

    if (onClick) {
        return (
            <button onClick={handleClick} className={styles}>
                {children}
            </button>
        );
    } else {
        return (
            <div className={styles}>
                {children}
            </div>
        );
    }
};

TagBadge.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    bgColor: PropTypes.string,
    className: PropTypes.string
};

TagBadge.defaultProps = {
    bgColor: "bg-text",
    onClick: null,
};

export default TagBadge;
