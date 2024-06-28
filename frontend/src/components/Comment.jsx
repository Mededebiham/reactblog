import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getCommentById, getUserById, deleteComment } from '../database/db';
import Link from "./parts/Link";
import { UserContext } from '../context';
import { toTitleCase } from "../utils/utils";

const Comment = ({ commentId }) => {
    const [comment, setComment] = useState(null);
    const [author, setAuthor] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchCommentAndAuthor = async () => {
            try {
                const fetchedCommentArray = await getCommentById(commentId);
                const fetchedComment = fetchedCommentArray[0];
                console.log('Fetched Comment:', fetchedComment); // Debugging line
                setComment(fetchedComment);

                if (fetchedComment && fetchedComment.authorid) {
                    const fetchedAuthor = await getUserById(fetchedComment.authorid);
                    console.log('Fetched Author:', fetchedAuthor); // Debugging line
                    setAuthor(fetchedAuthor);
                } else {
                    console.error('No author ID found in the comment');
                }
            } catch (error) {
                console.error('Error fetching comment or author:', error);
            }
        };

        fetchCommentAndAuthor();
    }, [commentId]);

    const handleDelete = async () => {
        try {
            await deleteComment(commentId);
            setComment(null); // Or trigger a re-fetch of the comments in the parent component
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEdit = () => {
        // Implement the edit functionality
    };

    if (!comment) {
        return <div>Lade Kommentar...</div>;
    }

    const canEdit = user._id === comment.authorid || user.role === 'admin' || user.role === 'mod';

    return (
        <div className="p-4 rounded mb-2 bg-mantle">
            <div className="flex justify-between text-xs mb-2 text-overlay0">
                <div className="flex">
                    {author ? (
                        <Link to={`/user/${comment.authorid}`} className="text-blue hover:text-yellow">
                            {toTitleCase(author.firstname)}
                        </Link>
                    ) : (
                        'Autor nicht gefunden'
                    )}
                    <p>:</p>
                </div>
                <div className="flex">
                    {canEdit && (
                        <>
                            <button onClick={handleEdit} className="pr-3 text-blue hover:text-yellow">Bearbeiten</button>
                            <button onClick={handleDelete} className="pr-3 text-red hover:text-yellow">Löschen</button>
                        </>
                    )}
                    <p>{new Date(comment.createdAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} {new Date(comment.createdAt).toLocaleDateString('de-DE')}</p>
                </div>
            </div>
            <hr className="border-surface1 mb-2" />
            <div className="text-text" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
        </div>
    );
};

Comment.propTypes = {
    commentId: PropTypes.string.isRequired,
};

export default Comment;
