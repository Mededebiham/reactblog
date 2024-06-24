import React, { useState } from 'react';
import { newId } from '../utils/utils';
import TagSelector from './TagSelector';

const BlogPost = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const availableTags = ['react', 'javascript', 'webdev', 'programming', 'css'];

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
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
            </div>
            <TagSelector
                availableTags={availableTags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4">
                Create Post
            </button>
        </form>
    );
};

export default BlogPost;
