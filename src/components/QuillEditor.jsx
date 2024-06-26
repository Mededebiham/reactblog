import React from 'react';
import ReactQuill from 'react-quill';

const QuillEditor = ({ value, onChange, placeholder = '', theight = 'h-96' }) => {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            className={`w-full border border-surface1 rounded-lg mt-1 bg-surface2 mb-16 ${theight}`}
            placeholder={placeholder}
            required
        />
    );
};

export default QuillEditor;