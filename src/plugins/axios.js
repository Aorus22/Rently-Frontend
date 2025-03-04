import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

api.interceptors.request.use(config => {
    const access_token = localStorage.getItem('access_token');
    const token_type = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `${token_type} ${access_token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
