
import React, { useState } from 'react';
import Comment from './Comment';
import QuillEditor from "./QuillEditor";

const Comments = ({ comments, addComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            addComment(newComment);
            setNewComment('');
        }
    };

    return (
        <div className="mt-4 py-4 px-6 bg-surface0 rounded-lg border-mantle">
            <h3 className="text-lg font-medium mb-2 text-text">Kommentare</h3>
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
            <form onSubmit={handleAddComment} className="mt-4">
                <QuillEditor
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Kommentar eingeben..."
                    theight='h-32'
                />
                <button type="submit" className="mt-2 px-2 p-1 bg-blue text-base rounded hover:bg-sapphire">
                    Kommentar hinzufügen
                </button>
            </form>
        </div>
    );
};

export default Comments;