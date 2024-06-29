import React from 'react';
import ReactQuill from 'react-quill';

const QuillEditor = ({ value, onChange, placeholder = '', theight = 'h-96', disabled = false }) => {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            className={`w-full border border-surface1 rounded-lg mt-1 bg-surface2 mb-16 ${theight} ${disabled ? 'ql-disabled' : ''}`}
            placeholder={placeholder}
            required
            readOnly={disabled}
        />
    );
};

export default QuillEditor;
