import React, { useState } from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';
import Pagination from '../components/Pagination'; // Import Pagination component
import PropTypes from 'prop-types';

const Comments = ({ commentIds, addComment, removeComment }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5; // Set the number of comments per page

    // Pagination logic
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = commentIds.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(commentIds.length / commentsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mt-4 py-4 px-6 bg-surface0 rounded-lg border-mantle">
            <h3 className="text-lg font-medium mb-2 text-text">Kommentare</h3>
            {currentComments.map((commentId, index) => (
                <Comment key={commentId} commentId={commentId} onDelete={() => removeComment(commentId)} />
            ))}
            <CreateComment addComment={addComment} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

Comments.propTypes = {
    commentIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    addComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
};

export default Comments;
