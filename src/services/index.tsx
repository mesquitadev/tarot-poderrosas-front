import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_AUTH_API,
});

api.interceptors.request.use(function (config) {
  const token = Cookies.get('poderrosas.token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers && 'Authorization' in config.headers) {
    // Remove o header se não houver token
    delete (config.headers as any).Authorization;
  }
  return config;
});

export default api;
