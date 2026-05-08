import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response handler: handle 401 to prompt re-login
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem('token');
      } catch (e) {}
      toast.error('Session expired or unauthorized. Please log in.');
      // redirect to login page
      try {
        window.location.href = '/login';
      } catch (e) {}
    }
    return Promise.reject(err);
  }
);

export default API;
