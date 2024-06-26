import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Stile für den Editor

const QuillEditor = ({ value, onChange }) => {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            className="w-full border border-surface1 rounded-lg mt-1 bg-surface2"
            required
        />
    );
};

export default QuillEditor;