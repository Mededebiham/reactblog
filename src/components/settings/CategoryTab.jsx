import React, {useContext} from 'react';
import { UserContext } from '../../context';
import {tags as tagObj, tags} from "../../database/mockPostData";
import TagPool from "../TagPool";
import CreateTag from "./CreateTag";
import ColorPicker from "../ColorPicker";

const CategoryTab = () => {
    const { user } = useContext(UserContext);

    if (user.role !== 'admin' && user.role !== 'mod') {
        return null;
    }

    const tagArray = Object.values(tags);

    return (
        <div>
            <h3 className="ml-1 text-lg font-bold mb-4">Existierende Kategorien:</h3>
            <TagPool tags={tagArray} />
            <p className="ml-1 mt-4 font-medium">
                <button className="text-blue hover:text-yellow">Neue Kategorie erstellen</button>, oder aus existierender auswählen zum Bearbeiten.
            </p>
            <CreateTag visible={true} />
        </div>
    );
};

export default CategoryTab;