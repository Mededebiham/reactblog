import React, { useState, useContext, useEffect } from 'react';
import TagPool from '../TagPool';
import QuillEditor from "../QuillEditor";
import { createPost, getTags } from "../../database/db";
import { UserContext } from '../../context';

const BlogPost = ({ addPost }) => {
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [availableTags, setAvailableTags] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tags = await getTags();
                setAvailableTags(tags);
            } catch (error) {
                setError('Failed to fetch tags');
            }
        };

        fetchTags();
    }, []);

    const [availableTagsForSelection, setAvailableTagsForSelection] = useState([]);
    const [selectedTagsForSelection, setSelectedTagsForSelection] = useState(selectedTags);

    useEffect(() => {
        setAvailableTagsForSelection(availableTags.filter(tag => !selectedTagsForSelection.includes(tag)));
    }, [availableTags, selectedTagsForSelection]);

    const handleTagClickAvailable = (tag, event) => {
        event.stopPropagation();
        if (selectedTagsForSelection.length < 3) {
            const newSelectedTags = [...selectedTagsForSelection, tag];
            setSelectedTagsForSelection(newSelectedTags);
            setSelectedTags(newSelectedTags);
            setAvailableTagsForSelection(availableTagsForSelection.filter((t) => t.id !== tag.id));
        } else {
            console.log("Max 3 tags allowed");
        }
    };

    const handleTagClickSelected = (tag, event) => {
        event.stopPropagation();
        const newSelectedTags = selectedTagsForSelection.filter((t) => t.id !== tag.id);
        setSelectedTagsForSelection(newSelectedTags);
        setSelectedTags(newSelectedTags);
        setAvailableTagsForSelection([...availableTagsForSelection, tag]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user._id) {
            setError('User is not logged in');
            return;
        }

        try {
            const newPost = {
                userid: user._id,
                title,
                content,
                likes: [],
                tags: selectedTags.map(tag => tag.name),
                comments: [],
            };

            const response = await createPost(newPost);
            addPost(response); // Assuming response contains the created post
            setTitle('');
            setContent('');
            setSelectedTags([]);
            setSelectedTagsForSelection([]); // Clear the selection state as well
            alert(response.message || 'Post erfolgreich erstellt!');

        } catch (error) {
            setError(error.message || 'Serverfehler');
        }
    };

    return (
        <>
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
                        <TagPool tags={availableTagsForSelection} onClick={handleTagClickAvailable} />
                    </div>
                    <div className={`${selectedTagsForSelection.length < 1 ? "hidden" : ""}`}>
                        <label className="block text-text mt-4 mb-2">Ausgewählte Tags</label>
                        <TagPool tags={selectedTagsForSelection} onClick={handleTagClickSelected} />
                    </div>
                </div>
                <button type="submit" className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">
                    Beitrag erstellen
                </button>
            </form>
        </>
    );
};

export default BlogPost;
