import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { newId } from '../../utils/utils';
import TagSelector from '../TagSelector';
import { tags as mockTags } from "../../database/mockPostData";
import '../../styles/quill.css';
import QuillEditor  from "../QuillEditor";

const BlogPost = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const availableTags = mockTags;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: newId(),
            title,
            content,
            likes: 0,
            comments: [],
            tags: selectedTags.map(tag => `#${tag}`)
        };
        addPost(newPost);
        setTitle('');
        setContent('');
        setSelectedTags([]);
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-surface0 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Neuen Beitrag erstellen</h2>
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
                <QuillEditor value={content} onChange={setContent}/>
            </div>
            <TagSelector
                availableTags={availableTags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
            <button type="submit" className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">
                Beitrag erstellen
            </button>
        </form>
        </>
    );
};

export default BlogPost;
