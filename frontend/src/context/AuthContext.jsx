import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout as logoutAction } from '../store/slices/authSlice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check localStorage for persisting user session
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  const login = async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (data.success) {
        setUser({ name: data.user.name, email: data.user.email, role: data.user.role });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_role', data.user.role);

        // Sync with Redux
        dispatch(loginSuccess({ user: data.user, token: data.token }));

        if (data.user.role === 'admin') {
          // If admin logs in via user portal, redirect to admin? Or prevent? 
          // User requested separate logics. Let's allow it but prefer they use admin portal.
          // For now, standardize to user home, as admins might want to shop too.
          navigate('/');
        } else {
          navigate('/');
        }
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (data.success) {
        setUser({ ...data.user, token: data.token });
        localStorage.setItem('token', data.token);

        // Sync with Redux
        dispatch(loginSuccess({ user: data.user, token: data.token }));

        // Admin specific redirect handled in component or here if needed
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();

      if (data.success) {
        setUser({ ...data.user, token: data.token });
        localStorage.setItem('token', data.token);

        // Sync with Redux
        dispatch(loginSuccess({ user: data.user, token: data.token }));

        navigate('/');
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Sync with Redux
    dispatch(logoutAction());

    navigate('/login');
  };

  const value = {
    user,
    login,
    adminLogin,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
