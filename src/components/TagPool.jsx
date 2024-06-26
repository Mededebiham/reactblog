import React from 'react';
import TagBadge from "./TagBadge";

const TagPool = ({ tags, onClick = null, onClickReset = null }) => {
    const handleClick = (tag) => {
        if (onClick) {
            onClick(tag);
        }
    };

    const handleResetClick = () => {
        if (onClickReset) {
            onClickReset();
        }
    };

    return (
        <div className="flex flex-wrap bg-mantle p-4 rounded-xl">
            {tags.map((tag) => (
                <TagBadge
                    onClick={tag.id ? () => handleClick(tag) : handleResetClick}
                    key={tag.id}
                    bgColor={tag.color}
                >
                    {tag.name}
                </TagBadge>
            ))}
        </div>
    );
};

export default TagPool;
