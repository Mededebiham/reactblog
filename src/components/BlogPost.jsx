// src/components/BlogPost.jsx

import React, { useState } from 'react';
import { newId } from '../utils/utils';

const BlogPost = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedTags = tags.split(',')
            .map(tag => tag.trim().split(' ')
                .map(word => `#${word}`)
                .join(' '));
        const newPost = {
            id: newId(),
            title,
            content,
            likes: 0,
            comments: [],
            tags: formattedTags
        };
        addPost(newPost);
        setTitle('');
        setContent('');
        setTags('');
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
            <div className="mb-4">
                <label className="block text-gray-700">Tags (comma separated)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Create Post
            </button>
        </form>
    );
};

export default BlogPost;
