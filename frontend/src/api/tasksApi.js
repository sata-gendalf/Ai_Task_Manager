import axios from 'axios';
import { getErrorMessage } from './errorHandler';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getTasks = async () => {
  try {
    const res = await api.get('/tasks');
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createTask = async (title) => {
  try {
    const res = await api.post('/tasks', { title });
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateTask = async (id, updates) => {
  try {
    const res = await api.put(`/tasks/${id}`, updates);
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};