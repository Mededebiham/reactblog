import React from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';
import PropTypes from 'prop-types';

const Comments = ({ commentIds, addComment, removeComment }) => {
    return (
        <div className="mt-4 py-4 px-6 bg-surface0 rounded-lg border-mantle">
            <h3 className="text-lg font-medium mb-2 text-text">Kommentare</h3>
            {commentIds.map((commentId, index) => (
                <Comment key={commentId} commentId={commentId} onDelete={() => removeComment(commentId)} />
            ))}
            <CreateComment addComment={addComment} />
        </div>
    );
};

Comments.propTypes = {
    commentIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    addComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired, // Added prop type
};

export default Comments;
