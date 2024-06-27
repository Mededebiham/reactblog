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
            getTags().then(fetchedTags => {
                setTags(fetchedTags);
            }).catch(error => {
                console.error('Error fetching tags:', error);
            });
        }
    }, [user.role]);

    if (user.role !== 'admin' && user.role !== 'mod') {
        return null;
    }

    const handleNewTag = () => {
        setIsNewTag(true);
        setTagId('new');
    };

    const handleEditTag = (tag) => {
        setIsNewTag(false);
        setTagId(tag.id);
    };

    return (
        <div>
            <h3 className="ml-1 text-lg font-bold mb-4">Existierende Kategorien:</h3>
            <TagPool tags={tags} onClick={handleEditTag} />
            <p className="ml-1 mt-4 font-medium">
                <button className="text-blue hover:text-yellow" onClick={handleNewTag}>
                    Neue Kategorie erstellen
                </button>, oder aus existierender auswählen zum Bearbeiten.
            </p>
            <CreateTag visible={isNewTag !== null} isNewTag={isNewTag} setIsNewTag={setIsNewTag} tagId={tagId} />
        </div>
    );
};

export default CategoryTab;
