import { Navigate, useLocation } from 'react-router-dom';

function CheckAuthentication({ isAuthenticated, user, children }) {

    const location = useLocation();

    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to="/auth/login" />;
    }

    if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){
        if (user?.role === 'admin') return <Navigate to={'/admin/categories'}/>
        return <Navigate to={'/categories'} />
    }

    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin') ) {
        return <Navigate to="/unauth-page" />;
    }

    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('/home')) {
        return <Navigate to="/admin/categories" />;
    }

    if (location.pathname === '/') {
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" />;
        }else {
            if (user?.role === 'admin') {
                return <Navigate to='/admin/categories' />
            }
            return <Navigate to='/categories' />
        }
    }

    return <>{children}</>;
}

export default CheckAuthentication;
