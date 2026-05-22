import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

// Theme constants for JSX-only styling consistency (safe, read-only export)
export const THEME = {
  background: 'var(--bg-900)',
  background2: 'var(--bg-800)',
  panel: 'var(--panel)',
  panelContrast: 'var(--panel-contrast)',
  textDark: 'var(--text-dark)',
  textMuted: 'var(--text-muted)',
  accent: 'var(--accent-warm)',
  accentStrong: 'var(--accent-warm-2)'
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await API.post('/auth/login', { username, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
