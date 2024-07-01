import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getCommentById, getUserById, deleteComment, updateComment } from '../database/db';
import Link from "./parts/Link";
import { UserContext } from '../context';
import { useAlert } from '../alert'; // Import the alert context
import { toTitleCase } from "../utils/utils";
import QuillEditor from "./QuillEditor";
import UserIcon from "./logos/UserIcon";

const Comment = ({ commentId, onDelete }) => {
    const [comment, setComment] = useState(null);
    const [author, setAuthor] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const { user } = useContext(UserContext);
    const { setAlert } = useAlert(); // Use the alert context

    useEffect(() => {
        const fetchCommentAndAuthor = async () => {
            try {
                const fetchedComment = await getCommentById(commentId);
                setComment(fetchedComment);
                setEditedContent(fetchedComment.content);

                if (fetchedComment && fetchedComment.authorid) {
                    const fetchedAuthor = await getUserById(fetchedComment.authorid);
                    setAuthor(fetchedAuthor);
                } else {
                    console.error('No author ID found in the comment');
                }
            } catch (error) {
                console.error('Error fetching comment or author:', error);
                setAlert({ content: 'Fehler beim Laden des Kommentars oder Autors', type: 'danger' });
            }
        };

        fetchCommentAndAuthor();
    }, [commentId, setAlert]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Kommentar wirklich löschen?");
        if (!confirmDelete) return;

        try {
            await deleteComment(commentId);
            onDelete(commentId); // Notify parent to remove the comment
            setAlert({ content: 'Kommentar gelöscht.', type: 'warning' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            setAlert({ content: 'Fehler beim Löschen des Kommentars.', type: 'danger' });
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(comment.content);
    };

    const handleSaveEdit = async () => {
        try {
            const updatedComment = await updateComment({ ...comment, content: editedContent });
            setComment(updatedComment);
            setIsEditing(false);
            setAlert({ content: 'Kommentar erfolgreich aktualisiert.', type: 'success' });
        } catch (error) {
            console.error('Error updating comment:', error);
            setAlert({ content: 'Fehler beim Aktualisieren des Kommentars.', type: 'danger' });
        }
    };

    if (!comment) {
        return <div>Lade Kommentar...</div>;
    }

    const canEdit = user._id === comment.authorid || user.role === 'admin' || user.role === 'mod';

    return (
        <>
            <div className="p-4 rounded mb-4 bg-mantle">
                <div className="flex justify-between text-xs mb-2 text-overlay0">
                    <div className="flex">
                        {author ? (
                            <Link to={`/user/${comment.authorid}`} className="text-blue hover:text-yellow flex items-center">
                                <UserIcon className="w-5 h-5 rounded-full mr-2" userId={author._id} /> {toTitleCase(author.firstname)} {toTitleCase(author.lastname)}
                            </Link>
                        ) : (
                            'Autor nicht gefunden'
                        )}
                    </div>
                    <div className="flex items-center">
                        <p>{new Date(comment.createdAt).toLocaleTimeString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })} {new Date(comment.createdAt).toLocaleDateString('de-DE')} {(comment.createdAt !== comment.updatedAt) && "(Bearbeitet)"}</p>
                        {canEdit && (
                            <>
                                {isEditing ? (
                                    <>
                                        <button onClick={handleSaveEdit} className="pl-3 text-blue hover:text-yellow">Ändern</button>
                                        <button onClick={handleCancelEdit} className="pl-3 text-red hover:text-yellow">Abbrechen</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleEdit} className="pl-3 text-blue hover:text-yellow">Bearbeiten</button>
                                        <button onClick={handleDelete} className="pl-3 text-red hover:text-yellow">Löschen</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <hr className="border-surface1 mb-2"/>
                {isEditing ? (
                    <QuillEditor
                        value={editedContent}
                        onChange={setEditedContent}
                        placeholder="Kommentar bearbeiten..."
                        theight="h-32"
                    />
                ) : (
                    <div className="text-text pt-2" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                )}
            </div>
        </>
    );
};

Comment.propTypes = {
    commentId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Comment;
