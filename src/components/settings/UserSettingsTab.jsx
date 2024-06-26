import React, { useState } from 'react';

const UserSettingsTab = () => {
    const [selectedFile, setSelectedFile] = useState(null);
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
            setPreviewUrl(null);
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
        console.log('Uploading file:', selectedFile);
        console.log('Changing name to:', name);
        console.log('Changing description to:', description);

        // Reset form (optional)
        setSelectedFile(null);
        setPreviewUrl(null);
        setName('');
        setDescription('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Upload Profile Picture
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>
                {previewUrl && <img src={previewUrl} alt="Profile Preview" style={{ width: '100px', height: '100px' }} />}

                <div>
                    <label>
                        Change Name
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                </div>

                <div>
                    <label>
                        Change Description
                        <input type="text" value={description} onChange={handleDescriptionChange} />
                    </label>
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default UserSettingsTab;