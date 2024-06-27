import React, { useState, useContext, useEffect } from 'react';
import TagPool from '../TagPool';
import QuillEditor from "../QuillEditor";
import { createPost, getTags } from "../../database/db";
import { UserContext } from '../../context';
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [availableTags, setAvailableTags] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tags = await getTags();
                setAvailableTags(tags);
            } catch (error) {
                setError('Fehler beim Laden der Tags');
            }
        };

        fetchTags();
    }, []);

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
            const newPost = {
                userid: user._id,
                title,
                content,
                likes: [],
                tags: selectedTags.map(tag => tag._id),
                comments: [],
            };

            console.log('Sending post data to backend:', newPost); // Debug log

            const response = await createPost(newPost);
            setTitle('');
            setContent('');
            setSelectedTags([]); // Clear the selection state as well

            // Redirect to the created post's detail page
            navigate(`/post/${response._id}`);

        } catch (error) {
            setError(error.message || 'Serverfehler');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-surface0 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Neuen Beitrag erstellen</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block text-text">Titel</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-16 h-full">
                    <label className="block text-text">Inhalt</label>
                    <QuillEditor value={content} onChange={setContent} />
                </div>
                <div className="mt-4">
                    <div>
                        <label className="block text-text mb-2">Verfügbare Tags</label>
                        <TagPool tags={availableTags} onClick={handleTagClickAvailable} />
                    </div>
                    <div className={`${selectedTags.length < 1 ? "hidden" : ""}`}>
                        <label className="block text-text mt-4 mb-2">Ausgewählte Tags</label>
                        <TagPool tags={selectedTags} onClick={handleTagClickSelected} />
                    </div>
                </div>
                <button type="submit" className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">
                    Beitrag erstellen
                </button>
            </form>
        </div>
    );
};

export default BlogPost;
