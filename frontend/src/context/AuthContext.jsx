import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Authenticate user session from localStorage cache on load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.data.user) {
            setUser(res.data.user);
            setIsAuthenticated(true);
          } else {
            handleLogout();
          }
        } catch (error) {
          handleLogout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Handle user login.
   */
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Invalid credentials';
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user registration.
   */
  const handleRegister = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await authService.register(name, email, password);
      if (res.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear session cache and log out user.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValues = {
    user,
    isAuthenticated,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
