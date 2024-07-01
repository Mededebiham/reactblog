import React, { useState } from 'react';
import QuillEditor from "./QuillEditor";
import PropTypes from 'prop-types';
import Button from "./parts/Button";

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
            <Button type="submit" className="mt-2">
                Kommentar hinzufügen
            </Button>
        </form>
    );
};

CreateComment.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default CreateComment;
