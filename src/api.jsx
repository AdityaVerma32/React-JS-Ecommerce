// src/api/userAPI.js

let baseURL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
    console.log(baseURL + '/auth/register');
    console.log(JSON.stringify(userData));
    const response = await fetch(baseURL + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Correct Content-Type
            'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return await response.json();
};

export const fetchProductById = async (id) => {
    try {

        const response = await fetch(baseURL + `/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Some Error occurred');
        }

        // Parse JSON response
        const jsonResponse = await response.json();

        // Return the 'data' property if it exists
        return jsonResponse;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};
