import axios from 'axios';

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

export const getTasks = async () => {
  const res = await api.get('/tasks');
  return res.data;
};

export const createTask = async (title) => {
  const res = await api.post('/tasks', { title });
  return res.data;
};

export const updateTask = async (id, updates) => {
  const res = await api.put(`/tasks/${id}`, updates);
  return res.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};