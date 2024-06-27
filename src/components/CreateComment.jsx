import React, { useState } from 'react';
import QuillEditor from "./QuillEditor";
import PropTypes from 'prop-types';

const CreateComment = ({ addComment }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim() !== '') {
            addComment(content);
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <QuillEditor
                value={content}
                onChange={(html) => setContent(html)}
                placeholder="Kommentar eingeben..."
                theight='h-32'
            />
            <button type="submit" className="mt-2 px-2 p-1 bg-blue text-base rounded hover:bg-sapphire">
                Kommentar hinzufügen
            </button>
        </form>
    );
};

CreateComment.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default CreateComment;
