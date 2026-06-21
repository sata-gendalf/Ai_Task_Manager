import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GuestRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <div>Загрузка...</div>;
  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default GuestRoute;
