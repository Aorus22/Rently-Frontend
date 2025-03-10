import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rently-api.alyza.site/api',
});

api.interceptors.request.use(config => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
