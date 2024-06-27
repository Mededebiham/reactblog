const API_BASE_URL = 'http://localhost:5001/api';

// Helper function for making API requests
const apiRequest = async (url, method = 'GET', data = null) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'API request failed');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error with ${method} request to ${url}:`, error);
        throw error;
    }
};

// Benutzer Funktionen
export const getUsers = () => apiRequest(`${API_BASE_URL}/users`);
export const getUserById = (userId) => apiRequest(`${API_BASE_URL}/users/${userId}`);
export const createUser = (user) => apiRequest(`${API_BASE_URL}/users`, 'POST', user);
export const updateUser = (user) => apiRequest(`${API_BASE_URL}/users/${user._id}`, 'PUT', user);
export const deleteUser = (userId) => apiRequest(`${API_BASE_URL}/users/${userId}`, 'DELETE');
export const deleteAllUsers = () => apiRequest(`${API_BASE_URL}/users`, 'DELETE');
export const loginUser = (credentials) => apiRequest(`${API_BASE_URL}/users/login`, 'POST', credentials);

// Post Funktionen
export const getPosts = () => apiRequest(`${API_BASE_URL}/posts`);
export const getPostById = (postId) => apiRequest(`${API_BASE_URL}/posts/${postId}`);
export const createPost = (post) => apiRequest(`${API_BASE_URL}/posts`, 'POST', post);
export const updatePost = (post) => apiRequest(`${API_BASE_URL}/posts/${post._id}`, 'PUT', post);
export const deletePost = (postId) => apiRequest(`${API_BASE_URL}/posts/${postId}`, 'DELETE');
export const deleteAllPosts = () => apiRequest(`${API_BASE_URL}/posts`, 'DELETE');

// Kommentar Funktionen
export const getComments = () => apiRequest(`${API_BASE_URL}/comments`);
export const getCommentById = (commentId) => apiRequest(`${API_BASE_URL}/comments/${commentId}`);
export const createComment = (comment) => apiRequest(`${API_BASE_URL}/comments`, 'POST', comment);
export const updateComment = (comment) => apiRequest(`${API_BASE_URL}/comments/${comment._id}`, 'PUT', comment);
export const deleteComment = (commentId) => apiRequest(`${API_BASE_URL}/comments/${commentId}`, 'DELETE');
export const deleteAllCommentsForPost = (postId) => apiRequest(`${API_BASE_URL}/comments/all/${postId}`, 'DELETE');

// Tag Funktionen
export const getTags = () => apiRequest(`${API_BASE_URL}/tags`);
export const getTagById = (tagId) => apiRequest(`${API_BASE_URL}/tags/${tagId}`);
export const createTag = (tag) => apiRequest(`${API_BASE_URL}/tags`, 'POST', tag);
export const updateTag = (tag) => apiRequest(`${API_BASE_URL}/tags/${tag._id}`, 'PUT', tag);
export const deleteTag = (tagId) => apiRequest(`${API_BASE_URL}/tags/${tagId}`, 'DELETE');
export const deleteAllTags = () => apiRequest(`${API_BASE_URL}/tags`, 'DELETE');
