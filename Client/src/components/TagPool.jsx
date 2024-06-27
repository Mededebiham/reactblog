import React from 'react';
import TagBadge from "./TagBadge";

const TagPool = ({ tags, onClick }) => {
    const handleClick = (tag, event) => {
        if (onClick) {
            onClick(tag, event);
        }
    };

    return (
        <div className="flex flex-wrap bg-mantle p-4 rounded-xl">
            {Array.isArray(tags) && tags.filter(tag => tag && tag._id && tag.name).map((tag) => (
                <TagBadge
                    onClick={(event) => handleClick(tag, event)}
                    key={tag._id}
                    bgColor={tag.color}
                >
                    {tag.name}
                </TagBadge>
            ))}
        </div>
    );
};

export default TagPool;