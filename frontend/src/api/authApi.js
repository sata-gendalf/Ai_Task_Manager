import axios from 'axios';
import { getErrorMessage } from './errorHandler';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const register = async (email, password) => {
  try {
    const res = await api.post('/auth/register', { email, password });
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getMe = async (token) => {
  try {
    const res = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};