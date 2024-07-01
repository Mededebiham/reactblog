import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TagPool from '../TagPool';
import QuillEditor from "../QuillEditor";
import { createPost, updatePost, getPostById, getTags, deletePost } from "../../database/db";
import { UserContext } from '../../context';
import Button from "../parts/Button";

const BlogPost = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [availableTags, setAvailableTags] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = Boolean(id);

    useEffect(() => {
        const fetchTagsAndPost = async () => {
            try {
                const tags = await getTags();
                setAvailableTags(tags);

                if (isEditMode) {
                    const post = await getPostById(id);
                    setTitle(post.title);
                    setContent(post.content);
                    setSelectedTags(tags.filter(tag => post.tags.includes(tag._id)));
                } else {
                    resetForm();
                }
            } catch (error) {
                setError('Fehler beim Laden der Tags oder des Beitrags');
            }
        };

        fetchTagsAndPost();
    }, [id, isEditMode]);

    useEffect(() => {
        if (!isEditMode) {
            resetForm();
        }
    }, [location.pathname]);

    const resetForm = () => {
        setTitle('');
        setContent('');
        setSelectedTags([]);
        setError('');
    };

    const handleTagClickAvailable = (tag, event) => {
        event.preventDefault();
        if (selectedTags.length < 3) {
            setSelectedTags(prevSelectedTags => [...prevSelectedTags, tag]);
        } else {
            console.log("Max 3 tags allowed");
        }
    };

    const handleTagClickSelected = (tag, event) => {
        event.preventDefault();
        setSelectedTags(prevSelectedTags => prevSelectedTags.filter(t => t._id !== tag._id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user._id) {
            setError('Bitte einloggen, um einen Beitrag zu erstellen');
            return;
        }

        if (selectedTags.length === 0) {
            setError('Bitte mindestens einen Tag auswählen');
            return;
        }

        try {
            const postData = {
                title,
                content,
                tags: selectedTags.map(tag => tag._id),
                userid: user._id,
            };

            if (isEditMode) {
                await updatePost({ ...postData, _id: id });
                navigate(`/post/${id}`);
            } else {
                const response = await createPost(postData);
                resetForm();
                navigate(`/post/${response._id}`);
            }
        } catch (error) {
            setError(error.message || 'Serverfehler');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Beitrag wirklich löschen?");
        if (!confirmDelete) return;

        try {
            await deletePost(id);
            navigate('/posts');
        } catch (error) {
            setError(error.message || 'Serverfehler');
        }
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 shadow-md rounded-lg bg-mantle">
                <h2 className="text-2xl font-bold mb-4 text-text">{isEditMode ? 'Beitrag bearbeiten' : 'Neuen Beitrag erstellen'}</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-text">Titel:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow-sm bg-surface0 border border-overlay1 text-base text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
                        required
                    />
                </div>
                <div className="mb-16 h-full">
                    <label className="block mb-2 text-sm font-medium text-text">Inhalt:</label>
                    <QuillEditor value={content} onChange={setContent} />
                </div>
                <div className="mt-4">
                    <div>
                        <label className="block text-sm font-medium text-text mb-2">Verfügbare Tags</label>
                        <TagPool tags={availableTags} onClick={handleTagClickAvailable} />
                    </div>
                    <div className={`${selectedTags.length < 1 ? "hidden" : ""}`}>
                        <label className="block text-sm font-medium text-text mt-4 mb-2">Ausgewählte Tags</label>
                        <TagPool tags={selectedTags} onClick={handleTagClickSelected} />
                    </div>
                </div>
                <div className="flex">
                    <Button type="submit" className="w-full mb-0">
                        {isEditMode ? 'Änderungen speichern' : 'Beitrag erstellen'}
                    </Button>
                    {isEditMode && (
                        <Button type="button" onClick={handleDelete} className="ml-2 w-full bg-red hover:bg-yellow mb-0">
                            Beitrag löschen
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BlogPost;
