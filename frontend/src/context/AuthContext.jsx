import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth as authApi } from '../api/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [role, setRole] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser).role : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await authApi.getMe();
          const userData = res.data.user ? res.data.user : res.data; 
          setUser(userData);
          setRole(userData.role);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error("Auth validation failed", error);
          // If token is invalid or expired
          if (error.response && error.response.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    const { token: newToken, user: newUser } = res.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    setRole(newUser.role);
    setIsAuthenticated(true);
  };

  const register = async (data) => {
    const res = await authApi.register(data);
    const { token: newToken, user: newUser } = res.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    setRole(newUser.role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  const quickLogin = async (demoRole) => {
    const emailMap = {
      student: 'student@demo.com',
      faculty: 'faculty@demo.com',
      industry: 'industry@demo.com',
      college: 'college@demo.com'
    };
    await login(emailMap[demoRole], 'demo123');
  };

  return (
    <AuthContext.Provider value={{ user, token, role, isAuthenticated, loading, login, register, logout, quickLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
