import React, { useState, useEffect, useContext } from 'react';
import BlogPost from '../components/posts/BlogPost';
import Comments from '../components/Comments';
import { UserContext } from '../context';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const CreatePost = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.role !== 'admin' || user.role === 'mod') {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts'));
        if (savedPosts) {
            setPosts(savedPosts);
        }
    }, []);

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

    if (user.role !== 'admin' || user.role === 'mod') {
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <BlogPost addPost={addPost} />
            <div className="mt-8">
                {posts.map(post => (
                    <div key={post.id} className="mb-8 p-4 bg-surface1 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">{post.title}</h2>
                        <div className="mt-2">{parse(post.content)}</div>
                        <div className="mt-4">
                            <span>Tags: </span>
                            {post.tags.map((tag, index) => (
                                <span key={index} className="inline-block bg-green text-gray-700 px-2 py-1 rounded mr-2">{tag}</span>
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
