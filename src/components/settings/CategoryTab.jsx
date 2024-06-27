import React, {useContext, useState} from 'react';
import { UserContext } from '../../context';
import { tags } from "../../database/mockPostData";
import TagPool from "../TagPool";
import CreateTag from "./CreateTag";

const CategoryTab = () => {
    const { user } = useContext(UserContext);
    const [isNewTag, setIsNewTag] = useState(null);
    const [tagId, setTagId] = useState(null);

    if (user.role !== 'admin' && user.role !== 'mod') {
        return null;
    }

    const tagArray = Object.values(tags);

    const handleNewTag = () => {
        setIsNewTag(true);
        setTagId('new');
    }

    const handleEditTag = (tag) => {
        setIsNewTag(false);
        setTagId(tag.id);
    }

    return (
        <div>
            <h3 className="ml-1 text-lg font-bold mb-4">Existierende Kategorien:</h3>
            <TagPool tags={tagArray} onClick={handleEditTag} />
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
