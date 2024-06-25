import React from 'react';
import PropTypes from 'prop-types';

const classNames = "text-base text-sm font-medium me-2 px-2.5 py-0.5 rounded-full mb-1"

const TagBadge = ({ children, onClick, bgColor = "bg-text", key, className = "" }) => {
    const styles = `${bgColor} ${classNames} ${className}`;

    if (onClick) {
        return (
            <button onClick={onClick} key={key} className={styles}>
                {children}
            </button>
        );
    } else {
        return (
            <span key={key} className={styles}>
                {children}
            </span>
        );
    }
};

TagBadge.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    bgColor: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TagBadge.defaultProps = {
    bgColor: "bg-text",
    onClick: null,
};

export default TagBadge;
