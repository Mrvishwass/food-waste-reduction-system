import { createContext, useContext, useState, useEffect } from 'react';
import { storage, api } from '../data/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = storage.get('foodshare_current_user');
    if (saved) setUser(saved);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const userData = await api.login(email, password);
    setUser(userData);
    storage.set('foodshare_current_user', userData);
    return userData;
  };

  const register = async (userData) => {
    const newUser = await api.register(userData);
    setUser(newUser);
    storage.set('foodshare_current_user', newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    storage.remove('foodshare_current_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    storage.set('foodshare_current_user', updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
