
import React, { useState } from 'react';
import Comment from './Comment';

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
        <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
            <form onSubmit={handleAddComment} className="mt-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Add a comment"
                />
                <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default Comments;