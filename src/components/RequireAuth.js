import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;

  return children;
}
