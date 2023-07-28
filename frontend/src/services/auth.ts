import axios from 'axios';

const API_URL = 'localhost:8000/api';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to login', error);
        throw error;
    }
};

export const register = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to register', error);
        throw error;
    }
};
