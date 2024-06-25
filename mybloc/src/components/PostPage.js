// client/src/components/PostPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts: ', error);
            });
    }, []);

    return (
        <div>
            <h1>Post Page</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {/* Zeige Kommentare für diesen Beitrag an */}
                        <CommentList postId={post._id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/comments/${postId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error(`Error fetching comments for post ${postId}: `, error);
            });
    }, [postId]);

    return (
        <ul>
            {comments.map(comment => (
                <li key={comment._id}>{comment.content}</li>
            ))}
        </ul>
    );
};

export default PostPage;
