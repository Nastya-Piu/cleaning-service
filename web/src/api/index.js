import axios from 'axios';
import { store } from 'react-notifications-component';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
}, error => {
  console.log(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const { response } = error;

  if (response.status === 401) {
    store.addNotification({
      title: 'Unauthorized',
      message: response.data,
      type: 'danger',
      container: 'top-right',
      dismiss: {
        duration: 3000,
        showIcon: true
      }
    });
  }

  if (response.status === 500) {
    store.addNotification({
      title: 'Internal server error',
      message: response.data,
      type: 'danger',
      container: 'top-right',
      dismiss: {
        duration: 3000,
        showIcon: true
      }
    });
  }
  return Promise.reject(response);
});

export default api;