export const getErrorMessage = (error) => {
  // Если это ошибка axios с ответом от сервера
  if (error.response && error.response.data) {
    const data = error.response.data;
    
    // Приоритет: message > data.message > статус код > дефолт
    if (typeof data === 'string') {
      return data;
    }
    
    if (data.message) {
      return data.message;
    }
  }

  // Обработка по статус кодам
  if (error.response) {
    const status = error.response.status;
    
    if (status === 400) return 'Проверьте введённые данные';
    if (status === 401) return 'Неправильный email или пароль';
    if (status === 403) return 'Доступ запрещён';
    if (status === 404) return 'Ресурс не найден';
    if (status === 409) return 'Пользователь с таким email уже существует';
    if (status >= 500) return 'Ошибка сервера. Попробуйте позже';
  }

  // Если это сетевая ошибка
  if (error.request && !error.response) {
    return 'Нет соединения с сервером. Проверьте интернет';
  }

  // Дефолтное сообщение
  return error.message || 'Неизвестная ошибка';
};
