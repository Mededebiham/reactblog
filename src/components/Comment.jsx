import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="border p-4 rounded-lg mb-2 bg-subtext0">
            <p className="text-gray-700">{comment}</p>
        </div>
    );
};

export default Comment;
