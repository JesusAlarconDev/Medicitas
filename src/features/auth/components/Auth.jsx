/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useMemo, useState, useEffect } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const AuthContext = React.createContext();

function decodeJwtPayload(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

function isJwtValid(token) {
    if (!token) return false;
    const payload = decodeJwtPayload(token);
    if (!payload || !payload.exp) return true; 
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp > nowInSeconds;
}

function AuthProvider ({children}) {
    const navigate = useNavigate();
    const [token, setToken] = useState(() => localStorage.getItem('userToken'));

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'userToken') {
                setToken(e.newValue);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const isAuthenticated = useMemo(() => isJwtValid(token), [token]);

    const loginWithToken = (newToken) => {
        localStorage.setItem('userToken', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setToken(null);
        navigate('/login', { replace: true });
    };

    const auth = {
        isAuthenticated,
        token,
        loginWithToken,
        logout,
    };

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

function AuthRoute ({children}) {
    const auth = useAuth();
    const location = useLocation();

    if(!auth.isAuthenticated){
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return children;
}

function useAuth () {
    const auth = useContext(AuthContext);
    return auth;
}

export {
    AuthProvider,
    AuthRoute,
    useAuth,
}


