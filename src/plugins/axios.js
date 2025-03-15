import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Khusus admin ndak usah pake user token
api.interceptors.request.use(config => {
  if (config.url.startsWith("/admin")) {
      const adminToken = localStorage.getItem("admin_access_token");
      if (adminToken) {
          config.headers.Authorization = `Bearer ${adminToken}`;
      }
  } else {
      const userToken = localStorage.getItem("access_token");
      if (userToken) {
          config.headers.Authorization = `Bearer ${userToken}`;
      }
  }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
