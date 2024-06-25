import React, { useState, useEffect } from 'react';
import TagBadge from "./TagBadge";

const TagSelector = ({ availableTags, selectedTags, setSelectedTags }) => {
    const tagArray = Object.values(availableTags);

    const [availableTagsForSelection, setAvailableTagsForSelection] = useState([]);
    const [selectedTagsForSelection, setSelectedTagsForSelection] = useState(selectedTags);

    useEffect(() => {
        setAvailableTagsForSelection(tagArray.filter(tag => !selectedTagsForSelection.includes(tag)));
    }, [tagArray, selectedTagsForSelection]);

    const handleTagClickAvailable = (tag) => {
        if (selectedTagsForSelection.length < 3) {
            const newSelectedTags = [...selectedTagsForSelection, tag];
            setSelectedTagsForSelection(newSelectedTags);
            setSelectedTags(newSelectedTags);
            const newAvailableTags = availableTagsForSelection.filter((t) => t.id !== tag.id);
            setAvailableTagsForSelection(newAvailableTags);
        }
    };

    const handleTagClickSelected = (tag) => {
        const newSelectedTags = selectedTagsForSelection.filter((t) => t.id !== tag.id);
        setSelectedTagsForSelection(newSelectedTags);
        setSelectedTags(newSelectedTags);
        const newAvailableTags = [...availableTagsForSelection, tag];
        setAvailableTagsForSelection(newAvailableTags);
    };

    return (
        <div className="mt-4">
            <div>
                <label className="block text-text mb-2">Verfügbare Tags</label>
                <div className="flex flex-wrap">
                    {availableTagsForSelection.map((tag) => (
                        <TagBadge
                            onClick={() => handleTagClickAvailable(tag)}
                            key={tag.id}
                            bgColor={tag.color}
                        >
                            {tag.name}
                        </TagBadge>
                    ))}
                </div>
            </div>
            <div className={`${selectedTagsForSelection.length < 1 ? "hidden" : ""}`}>
                <label className="block text-text mt-4 mb-2">Ausgewählte Tags</label>
                <div className="flex flex-wrap">
                    {selectedTagsForSelection.map((tag) => (
                        <TagBadge
                            onClick={() => handleTagClickSelected(tag)}
                            key={tag.id}
                            bgColor={tag.color}
                        >
                            {tag.name}
                        </TagBadge>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagSelector;
