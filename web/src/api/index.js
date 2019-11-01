import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers["Authorization"] = `bearer ${token}`;
  return config;
}, error => {
  console.log(error);
});

export default api;