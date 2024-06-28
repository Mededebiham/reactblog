const API_BASE_URL = 'http://localhost:5001/api';

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

export const uploadImage = (formData) => apiRequest(`${API_BASE_URL}/images/upload`, 'Post');
export const downloadImage = (imageId) => apiRequest(`${API_BASE_URL}/images/download/${imageId}`);
