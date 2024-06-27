import {useState} from "react";

const API_BASE_URL = 'http://localhost:5001/api';

// Benutzer Funktionen
const getUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const getUserById = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching user with id ${userId}:`, error);
    }
};

const createUser = async (user) => {

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

const updateUser = async (user) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

const deleteUser = async (userId) => {
    try {
        await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

const deleteAllUsers = async () => {
    try {
        await fetch(`${API_BASE_URL}/users`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting all users:', error);
    }
};

// Post Funktionen
const getPosts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

const getPostById = async (postId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching post with id ${postId}:`, error);
    }
};

const createPost = async (post) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

const updatePost = async (post) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating post:', error);
    }
};

const deletePost = async (postId) => {
    try {
        await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

const deleteAllPosts = async () => {
    try {
        await fetch(`${API_BASE_URL}/posts`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting all posts:', error);
    }
};

// Kommentar Funktionen
const getComments = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};

const getCommentById = async (commentId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching comment with id ${commentId}:`, error);
    }
};

const createComment = async (comment) => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating comment:', error);
    }
};

const updateComment = async (comment) => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${comment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating comment:', error);
    }
};

const deleteComment = async (commentId) => {
    try {
        await fetch(`${API_BASE_URL}/comments/${commentId}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};

const deleteAllCommentsForPost = async (postId) => {
    try {
        await fetch(`${API_BASE_URL}/comments/all/${postId}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting all comments for post:', error);
    }
};

// Tag Funktionen
const getTags = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/tags`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
};

const getTagById = async (tagId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tags/${tagId}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching tag with id ${tagId}:`, error);
    }
};

const createTag = async (tag) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tag)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Failed to create tag');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating tag:', error);
        throw error;
    }
};

const updateTag = async (tag) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tags/${tag.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tag)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating tag:', error);
    }
};

const deleteTag = async (tagId) => {
    try {
        await fetch(`${API_BASE_URL}/tags/${tagId}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting tag:', error);
    }
};

const deleteAllTags = async () => {
    try {
        await fetch(`${API_BASE_URL}/tags`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting all tags:', error);
    }
};

// Export aller Funktionen
export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    deleteAllPosts,
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    deleteAllCommentsForPost,
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
    deleteAllTags
};
