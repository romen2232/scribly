import axios from 'axios';
import { BASE_URL } from '../utils/consts';

/**
 * This is the base URL for the API.
 * It is the same for all requests.
 */
export const apiClient = axios.create({
    baseURL: BASE_URL,
});
