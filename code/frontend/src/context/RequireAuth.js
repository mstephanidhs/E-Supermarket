import { useAuth } from './Auth';
import { Navigate } from 'react-router-dom';

// protect each route - user must be authenticated in order to access
function RequireAuth({ children }) {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default RequireAuth;
