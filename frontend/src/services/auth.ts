import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/login/`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to login', error);
        throw error;
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/register/`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to register', error);
        throw error;
    }
};

export const getUser = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/users/me/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get user', error);
        throw error;
    }
};
