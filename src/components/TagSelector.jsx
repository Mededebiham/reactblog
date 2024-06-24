import React, { useState } from 'react';

const TagSelector = ({ availableTags, selectedTags, setSelectedTags }) => {
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className="mt-4">
            <label className="block text-gray-700 mb-2">Select Tags</label>
            <div className="flex flex-wrap">
                {availableTags.map(tag => (
                    <span
                        key={tag}
                        className={`cursor-pointer px-2 py-1 m-1 border rounded ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleTagClick(tag)}
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
