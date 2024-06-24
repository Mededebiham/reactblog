import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import Comments from '../components/Comments';

const CreatePost = () => {
    const [posts, setPosts] = useState([]);

    // Load posts from localStorage on component mount
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts'));
        if (savedPosts) {
            setPosts(savedPosts);
        }
    }, []);

    // Save posts to localStorage whenever posts state changes
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const addCommentToPost = (postId, comment) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, comment]
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    return (
        <div className="container mx-auto p-4">
            <BlogPost addPost={addPost} />
            <div className="mt-8">
                {posts.map(post => (
                    <div key={post.id} className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">{post.title}</h2>
                        <p className="mt-2 text-gray-700">{post.content}</p>
                        <div className="mt-4">
                            <span className="text-gray-600">Tags: </span>
                            {post.tags.map((tag, index) => (
                                <span key={index} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2">{tag}</span>
                            ))}
                        </div>
                        <Comments comments={post.comments} addComment={(comment) => addCommentToPost(post.id, comment)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreatePost;
