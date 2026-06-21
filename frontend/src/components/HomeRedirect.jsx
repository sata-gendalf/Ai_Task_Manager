import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomeRedirect = () => {
  const { token, loading } = useAuth();

  if (loading) return <div>Загрузка...</div>;
  return <Navigate to={token ? '/dashboard' : '/login'} replace />;
};

export default HomeRedirect;
