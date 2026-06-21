import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Регистрация</h2>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Пароль (не менее 6 символов):</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      <p style={{ marginTop: '12px' }}>
        Уже есть аккаунт? <Link to="/login" className="link">Войти</Link>
      </p>
    </form>
  );
};

export default RegisterForm;