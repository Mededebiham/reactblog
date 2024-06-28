import React, { useState, useEffect, useContext } from 'react';
import BlogPost from '../components/posts/BlogPost';
import { UserContext } from '../context';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.role !== 'admin' && user.role !== 'mod') {
            navigate('/login');
        }
    }, [user, navigate]);

    if (user.role !== 'admin' && user.role !== 'mod') {
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <BlogPost />
        </div>
    );
};

export default CreatePost;
