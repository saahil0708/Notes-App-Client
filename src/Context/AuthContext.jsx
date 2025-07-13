import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} email
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {string|null} token
 * @property {(user: User, token: string) => void} login
 * @property {() => void} logout
 * @property {(cb: (msg: string) => void) => void} setLogoutCallback
 */

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [logoutCallback, setLogoutCallbackState] = useState(null);

  // Persist auth state in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    if (logoutCallback) logoutCallback('You have been logged out successfully.');
  };

  const setLogoutCallback = (cb) => {
    setLogoutCallbackState(() => cb);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setLogoutCallback }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
