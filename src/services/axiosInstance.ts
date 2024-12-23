import axios from 'axios';

// const API_VERSION = 'v1';

const axiosInstance = axios.create({
    baseURL: `http://localhost:8000/api`, // Replace with your API base URL
});

export default axiosInstance;
