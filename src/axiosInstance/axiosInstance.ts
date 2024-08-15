import axios from 'axios';

const URL = import.meta.env.DEV
    ? 'http://localhost:8080'
    : 'https://flashcraftr-server.onrender.com';
console.log(URL);

const axiosInstance = axios.create({
    baseURL: URL,
});

export default axiosInstance;
