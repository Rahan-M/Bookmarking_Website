import axios from 'axios';

// 1. Create Axios instance
const bookmarkApi = axios.create({
  baseURL: 'http://localhost:5000/api/bookmarks',
});
const folderApi = axios.create({
  baseURL: 'http://localhost:5000/api/folders',
});
const userApi = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

// 2. Attach interceptor to inject JWT
bookmarkApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Or from cookies, context, etc.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
folderApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Or from cookies, context, etc.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {bookmarkApi, folderApi, userApi};