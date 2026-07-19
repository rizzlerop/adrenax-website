import React, { createContext, useContext, useState } from 'react';
import { DEMO_USERS } from '../data/storeDefaults';

const AuthContext = createContext();
const AUTH_STORAGE_KEY = 'adrenax_auth_session';

const readStoredUser = () => {
  try {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error('Unable to read auth session from local storage.', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(readStoredUser);

  const login = (email, password) => {
    const matchingUser = DEMO_USERS.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password,
    );

    if (!matchingUser) {
      return {
        ok: false,
        message: 'Incorrect email or password. Use one of the demo accounts below.',
      };
    }

    const nextUser = {
      id: matchingUser.id,
      name: matchingUser.name,
      email: matchingUser.email,
      role: matchingUser.role,
      lastLoginAt: new Date().toISOString(),
    };

    setCurrentUser(nextUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));

    return {
      ok: true,
      user: nextUser,
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
