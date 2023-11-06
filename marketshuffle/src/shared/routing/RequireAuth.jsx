import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();
    // console.log('Auth object:', auth);
    return (
        auth?.token
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequireAuth;