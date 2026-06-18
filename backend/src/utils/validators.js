const { ValidationError } = require('./errors');
const { PASSWORD_MIN_LENGTH, TASK_STATUSES, TASK_PRIORITIES } = require('../config/constants');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= PASSWORD_MIN_LENGTH;
};

const validateRegistration = (data) => {
  const errors = {};

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Некорректный email адрес';
  }

  if (!data.password || !validatePassword(data.password)) {
    errors.password = `Пароль должен быть минимум ${PASSWORD_MIN_LENGTH} символов`;
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Ошибка валидации данных', errors);
  }
};

const validateLogin = (data) => {
  const errors = {};

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Некорректный email адрес';
  }

  if (!data.password) {
    errors.password = 'Пароль обязателен';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Ошибка валидации данных', errors);
  }
};

const validateTaskCreate = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Название задачи обязательно';
  }

  if (data.title && data.title.length > 255) {
    errors.title = 'Название не может быть длиннее 255 символов';
  }

  if (data.priority && !TASK_PRIORITIES.includes(data.priority)) {
    errors.priority = `Некорректный приоритет (${TASK_PRIORITIES.join(', ')})`;
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Ошибка валидации данных', errors);
  }
};

const validateTaskUpdate = (data) => {
  if (data.title && data.title.trim().length === 0) {
    throw new ValidationError('Название не может быть пустым');
  }

  if (data.title && data.title.length > 255) {
    throw new ValidationError('Название не может быть длиннее 255 символов');
  }

  if (data.priority && !TASK_PRIORITIES.includes(data.priority)) {
    throw new ValidationError(`Некорректный приоритет (${TASK_PRIORITIES.join(', ')})`);
  }

  if (data.status && !TASK_STATUSES.includes(data.status)) {
    throw new ValidationError(`Некорректный статус (${TASK_STATUSES.join(', ')})`);
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  validateRegistration,
  validateLogin,
  validateTaskCreate,
  validateTaskUpdate
};
