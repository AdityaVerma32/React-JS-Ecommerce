// src/api/userAPI.js
import axios from "axios";
let baseURL = import.meta.env.VITE_API_URL;


export const registerUser = async (userData) => {

    const response = await axios.post(
        baseURL + '/auth/register',
        JSON.stringify(userData), {
        headers: {
            'Content-Type': 'application/json', // Correct Content-Type
            'Accept': 'application/json'
        }
    });

    return response;
};

export const fetchProductById = async (id) => {
    try {

        const response = await axios.get(baseURL + `/products/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.data.success) {
            throw new Error('Some Error occurred');
        }

        // Return the 'data' property if it exists
        return response.data.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};

export const fetchAllProducts = async () => {
    try {
        const response = await axios.get(baseURL + '/products', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.data.success) {
            throw new Error('Some Error occurred');
        }

        return response.data.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error; // Re-throw the error for the caller to handle
    }
} 