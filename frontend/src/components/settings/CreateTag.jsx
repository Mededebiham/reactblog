import React, { useEffect, useState } from 'react';
import ColorPicker from "../ColorPicker";
import Button from "../parts/Button";
import TagBadge from "../TagBadge";
import { createTag, updateTag, deleteTag, getTagById } from "../../database/db";

const CreateTag = ({ visible = false, isNewTag, setIsNewTag, tagId, updateTagPool }) => {
    const [selectedColor, setSelectedColor] = useState("bg-blue");
    const [error, setError] = useState("");
    const [tagName, setTagName] = useState("");

    useEffect(() => {
        if (tagId && tagId !== 'new') {
            getTagById(tagId)
                .then(tagToEdit => {
                    setTagName(tagToEdit ? tagToEdit.name : "");
                    setSelectedColor(tagToEdit ? tagToEdit.color : "bg-blue");
                    setError("");
                })
                .catch(e => setError("Unerwarteter Fehler: " + e.message));
        } else {
            setTagName("");
            setSelectedColor("bg-blue");
            setError("");
        }
    }, [tagId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTag = {
            name: tagName,
            color: selectedColor
        };

        try {
            if (tagId !== 'new' && tagId !== null) {
                newTag._id = tagId;
                await updateTag(newTag);
            } else {
                await createTag(newTag);
            }
            resetForm();
            updateTagPool();
        } catch (e) {
            setError("Unerwarteter Fehler: " + e.message);
        }
    };

    const handleDelete = async () => {
        try {
            if (tagId !== 'new' && tagId !== null) {
                await deleteTag(tagId);
                resetForm();
                updateTagPool();
            }
        } catch (e) {
            setError("Unerwarteter Fehler: " + e.message);
        }
    };

    const resetForm = () => {
        setSelectedColor("bg-blue");
        setTagName("");
        setIsNewTag(null);
    };

    const handleChange = (e) => {
        setTagName(e.target.value);
    };

    return (
        <div className={`ml-1 mt-8 ${visible ? "" : "hidden"}`}>

            <form className="max-w-lg mx-auto mt-4" onSubmit={handleSubmit}>
                <h3 className="text-lg font-medium mt-12 mb-8">
                    {isNewTag ? "Neue Kategorie erstellen" : "Kategorie bearbeiten"}
                </h3>
                <div className="mb-5">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-text">
                        Bezeichnung der Kategorie
                    </label>
                    <input
                        type="text"
                        id="category"
                        className="input"
                        placeholder="Name der Kategorie"
                        onChange={handleChange}
                        value={tagName}
                        required
                    />
                </div>
                {!error && tagName && (
                    <div className="flex mb-4 items-center">
                        <p className="mr-2">Vorschau:</p>
                        <TagBadge bgColor={selectedColor}>{tagName}</TagBadge>
                    </div>
                )}
                {error && <p className="text-red ml-2 mb-2">{error}</p>}
                <div className="flex">
                    <Button type="submit">
                        {isNewTag ? "Kategorie erstellen" : "Kategorie ändern"}
                    </Button>
                    {!isNewTag && (
                        <Button className="bg-red" type="button" onClick={handleDelete}>
                            Kategorie löschen
                        </Button>
                    )}
                    <Button className="bg-yellow" type="button" onClick={resetForm}>Abbrechen</Button>
                </div>
            </form>
            {tagName && (
                <>
                    <p>Farbe auswählen oder ändern:</p>
                    <ColorPicker onClick={setSelectedColor} selectedColor={selectedColor} />
                </>
            )}
        </div>
    );
};

export default CreateTag;
