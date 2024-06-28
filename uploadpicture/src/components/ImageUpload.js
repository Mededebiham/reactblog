
import React, { useState } from 'react'
import {uploadImage} from "../db";

const ImageUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            await uploadImage(formData);
            console.log('Image uploaded successfully');
            // Handle success (e.g., show success message)
        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default ImageUpload;
