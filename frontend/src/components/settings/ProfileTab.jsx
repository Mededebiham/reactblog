import React, {useState} from 'react';
import defaultProfilePic from "../../assets/unknown.jpg";

const ProfileTab = () => {
    const [selectedFile, setSelectedFile] = useState(defaultProfilePic);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(defaultProfilePic);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Profilbild hochladen:', selectedFile);
        console.log(' Name ändern:', name);
        console.log('\n' + 'Beschreibung ändern in:', description);


        setSelectedFile(null);
        setPreviewUrl(defaultProfilePic);
        setName('');
        setDescription('');
    };

    return (
        <div className="w-full   ">
            <img src={defaultProfilePic} alt="Profile Preview"
                 className="w-32 h-32 rounded-full mx-auto mb-4"/>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">Profilbild hochladen</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="input"/>

                    {previewUrl &&
                        <img src={previewUrl} alt="Profile Preview" className="w-24 h-24 rounded-lg mt-2 mx-auto"/>}
                </div>

                <div>
                    <label className="label"> Name ändern</label>
                    <input type="text" value={name} onChange={handleNameChange} className="input"/>
                </div>

                <div>
                    <label className="label">Beschreibung ändern</label>
                    <input type="text" value={description} onChange={handleDescriptionChange} className="input"/>
                </div>

                <button type="submit" className="button">Änderungen speichern</button>
            </form>
        </div>
    );
};

export default ProfileTab;