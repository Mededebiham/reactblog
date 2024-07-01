import React, { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { useAlert } from '../../alert'; // Import the alert context
import { updateUser } from '../../database/db';
import Button from "../parts/Button";
import QuillEditor from "../QuillEditor";

const ProfileTab = () => {
    const { user, setUser } = useContext(UserContext);
    const { setAlert } = useAlert(); // Use the alert context
    const [imageUrl, setImageUrl] = useState(user.profilepicture || '');
    const [firstname, setFirstname] = useState(user.firstname || '');
    const [lastname, setLastname] = useState(user.lastname || '');
    const [description, setDescription] = useState(user.description || '');
    const [isEditing, setIsEditing] = useState(false);

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
    };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
    };

    const handleDescriptionChange = (content) => {
        setDescription(content);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = {
            ...user,
            profilepicture: imageUrl,
            firstname,
            lastname,
            description,
        };

        try {
            const res = await updateUser(updatedUser);
            setUser(res);
            setIsEditing(false);
            setAlert({ content: 'Änderungen erfolgreich gespeichert.', type: 'success' });
        } catch (error) {
            setAlert({ content: error.message || 'Fehler beim Speichern der Änderungen.', type: 'danger' });
        }
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-6 shadow-md rounded-lg bg-mantle">
                <h2 className="text-2xl font-bold mb-4 text-text">Profileinstellungen</h2>
                {imageUrl && (
                    <img src={imageUrl} alt="Profile Preview" className="w-48 h-48 rounded-3xl mt-2 mx-auto mb-4" />
                )}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-text">Profilbild URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        className={`shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 ${isEditing ? 'text-text' : 'text-overlay1'}`}
                        placeholder="URL zum neuen Profilbild eingeben"
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-text">Vorname:</label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={handleFirstnameChange}
                        className={`shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 ${isEditing ? 'text-text' : 'text-overlay1'}`}
                        placeholder="Vorname eingeben"
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-text">Nachname:</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={handleLastnameChange}
                        className={`shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 ${isEditing ? 'text-text' : 'text-overlay1'}`}
                        placeholder="Nachname eingeben"
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-text">Beschreibung:</label>
                    <QuillEditor
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Beschreibung eingeben"
                        theight="h-32"
                        disabled={!isEditing}
                    />
                </div>

                {!isEditing && (
                    <Button
                        type="button"
                        className="w-full"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        Profil bearbeiten
                    </Button>
                )}

                {isEditing && (
                    <Button
                        type="submit"
                        className="bg-green w-full"
                    >
                        Änderungen speichern
                    </Button>
                )}
            </form>
        </div>
    );
};

export default ProfileTab;
