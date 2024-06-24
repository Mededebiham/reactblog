import React from 'react';
import PropTypes from 'prop-types';

const TagBadge = ({ children, onClick, bgColor = "bg-text", key }) => {
    const className = `${bgColor} text-base text-sm font-medium me-2 px-2.5 py-0.5 rounded-full mb-1`;

    if (onClick) {
        return (
            <button onClick={onClick} key={key} className={className}>
                {children}
            </button>
        );
    } else {
        return (
            <span key={key} className={className}>
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
