import React, { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { updateUser } from '../../database/db';
import Button from "../parts/Button";
import QuillEditor from "../QuillEditor";

const ProfileTab = () => {
    const { user, setUser } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState(user.profilepicture || '');
    const [firstname, setFirstname] = useState(user.firstname || '');
    const [lastname, setLastname] = useState(user.lastname || '');
    const [description, setDescription] = useState(user.description || '');
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState('');

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
            setErrors('');
            setIsEditing(false);
            alert('Änderungen erfolgreich gespeichert.');
        } catch (error) {
            setErrors(error.message || 'Fehler beim Speichern der Änderungen.');
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-96 bg-mantle p-6 rounded-lg shadow-lg">
                <h2 className="header2">Profileinstellungen</h2>
                {imageUrl && (
                    <img src={imageUrl} alt="Profile Preview" className="w-48 h-48 rounded-3xl mt-2 mx-auto mb-4" />
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Profilbild URL</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={handleImageUrlChange}
                            className={`input ${isEditing ? 'text-text' : 'text-overlay1'}`}
                            placeholder="URL zum neuen Profilbild eingeben"
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <label className="label">Vorname</label>
                        <input
                            type="text"
                            value={firstname}
                            onChange={handleFirstnameChange}
                            className={`input ${isEditing ? 'text-text' : 'text-overlay1'}`}
                            placeholder="Vorname eingeben"
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <label className="label">Nachname</label>
                        <input
                            type="text"
                            value={lastname}
                            onChange={handleLastnameChange}
                            className={`input ${isEditing ? 'text-text' : 'text-overlay1'}`}
                            placeholder="Nachname eingeben"
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <label className="label">Beschreibung</label>
                        <QuillEditor
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Beschreibung eingeben"
                            theight="h-32"
                            disabled={!isEditing}
                        />
                    </div>

                    {errors && <p className="text-red">{errors}</p>}

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
        </div>
    );
};

export default ProfileTab;
