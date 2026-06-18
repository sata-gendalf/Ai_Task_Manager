const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Request error', {
    message: err.message,
    status: err.status,
    code: err.code,
  });

  let status = 500;
  let message = 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.';
  let details = null;

  if (err.status === 400 || err.name === 'ValidationError') {
    status = 400;
    message = err.message || 'Некорректные данные. Проверьте введённую информацию.';
    details = err.details;
  }

  if (err.status === 401 || err.name === 'AuthenticationError') {
    status = 401;
    message = 'Требуется авторизация. Пожалуйста, войдите в систему.';
  }

  if (err.status === 403 || err.name === 'AuthorizationError') {
    status = 403;
    message = 'У вас нет прав доступа к этому ресурсу.';
  }

  if (err.status === 404 || err.name === 'NotFoundError') {
    status = 404;
    message = err.message || 'Запрашиваемый ресурс не найден.';
  }

  if (err.status === 409 || err.name === 'ConflictError') {
    status = 409;
    message = err.message || 'Возникла проблема с данными. Попробуйте ещё раз.';
  }

  if (err.code === '23505') {
    status = 409;
    message = 'Такие данные уже существуют в системе.';
  }

  if (err.code === '23502') {
    status = 400;
    message = 'Некоторые обязательные поля не заполнены.';
  }

  if (err.code === '23503') {
    status = 400;
    message = 'Неправильная ссылка на данные.';
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Ваша сессия истекла. Пожалуйста, авторизуйтесь заново.';
  }

  if (err.code === 'ECONNREFUSED') {
    status = 503;
    message = 'Сервис временно недоступен. Попробуйте позже.';
  }

  res.status(status).json({
    success: false,
    message: message,
    ...(details && { details }),
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};

module.exports = errorHandler;