import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Вход</h2>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Пароль:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-primary">Войти</button>
      <p style={{ marginTop: '12px' }}>
        Нет аккаунта? <a href="/register" className="link">Зарегистрироваться</a>
      </p>
    </form>
  );
};

export default LoginForm;