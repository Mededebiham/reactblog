import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import TagPool from "../TagPool";
import CreateTag from "./CreateTag";
import { getTags } from "../../database/db";

const CategoryTab = () => {
    const { user } = useContext(UserContext);
    const [isNewTag, setIsNewTag] = useState(null);
    const [tagId, setTagId] = useState(null);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (user.role === 'admin' || user.role === 'mod') {
            fetchTags();
        }
    }, [user.role]);

    const fetchTags = async () => {
        try {
            const fetchedTags = await getTags();
            setTags(fetchedTags);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    if (user.role !== 'admin' && user.role !== 'mod') {
        return null;
    }

    const handleNewTag = () => {
        setIsNewTag(true);
        setTagId('new');
    };

    const handleEditTag = (tag) => {
        setIsNewTag(false);
        setTagId(tag._id);
    };

    return (
        <div className="bg-surface1 p-4 rounded-lg w-full">
            <h3 className="ml-1 text-lg font-bold mb-4">Existierende Kategorien:</h3>
            <TagPool tags={tags} onClick={handleEditTag} />
            <p className="ml-1 mt-4 font-medium">
                <button className="text-blue hover:text-yellow" onClick={handleNewTag}>
                    Neue Kategorie erstellen
                </button>, oder aus existierender auswählen zum Bearbeiten.
            </p>
            <CreateTag
                visible={isNewTag !== null}
                isNewTag={isNewTag}
                setIsNewTag={setIsNewTag}
                tagId={tagId}
                updateTagPool={fetchTags}
            />
        </div>
    );
};

export default CategoryTab;
