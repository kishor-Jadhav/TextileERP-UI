// src/axiosConfig.js
import axios from 'axios';
import { serverURL } from '../Constants/EnvironmentConstant';
 
 

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: serverURL, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});
 
 
export const setHeaders = (contentType = 'application/json') => {
    return {
        'Content-Type': contentType,
    };
};

export default axiosInstance;