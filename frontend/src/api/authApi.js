// ВРЕМЕННЫЕ ЗАГЛУШКИ (mock), пока бэкенд не готов
// Потом их заменим на реальные вызовы через axiosInstance

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const register = async (email, password) => {
  await delay(500); // имитируем сетевой запрос
  // Проверяем простые условия для демонстрации
  if (email && password && password.length >= 6) {
    // Имитируем успешную регистрацию и возвращаем токен
    const fakeToken = 'fake-jwt-token-' + Date.now();
    return { token: fakeToken };
  } else {
    throw new Error('Пароль должен быть не менее 6 символов');
  }
};

export const login = async (email, password) => {
  await delay(500);
  // Для демо: любой email/password, кроме пустых
  if (email && password) {
    const fakeToken = 'fake-jwt-token-' + Date.now();
    return { token: fakeToken };
  } else {
    throw new Error('Неверный email или пароль');
  }
};