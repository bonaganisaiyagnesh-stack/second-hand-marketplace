import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: (customUser?: Partial<User>) => Promise<void>;
  register: (data: { name: string; email: string; role: UserRole; city: string }) => Promise<void>;
  logout: () => void;
  switchDemoUser: (role: 'admin' | 'seller' | 'buyer') => Promise<void>;
  isAdmin: boolean;
  isSeller: boolean;
  isBuyer: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    try {
      const current = api.getCurrentUser();
      setUser(current);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      const loggedIn = await api.login(email, password);
      setUser(loggedIn);
      success(`Welcome back, ${loggedIn.name}`);
    } catch (err: any) {
      error('Authentication Error', err.message || 'Login failed');
      throw err;
    }
  };

  const loginWithGoogle = async (customUser?: Partial<User>) => {
    try {
      const loggedIn = await api.loginWithGoogle(customUser);
      setUser(loggedIn);
      success('Google Authentication Successful', `Logged in as ${loggedIn.name} (${loggedIn.email})`);
    } catch (err: any) {
      error('Google Sign-In Error', err.message || 'Failed to authenticate with Google');
      throw err;
    }
  };

  const register = async (data: { name: string; email: string; role: UserRole; city: string }) => {
    try {
      const newUser = await api.register(data);
      setUser(newUser);
      success('Account Created', `Logged in as ${newUser.name}`);
    } catch (err: any) {
      error('Registration Error', err.message || 'Failed to create account');
      throw err;
    }
  };

  const logout = () => {
    api.setCurrentUser(null);
    setUser(null);
    success('Logged out successfully');
  };

  const switchDemoUser = async (role: 'admin' | 'seller' | 'buyer') => {
    const emailMap = {
      admin: 'admin@reloop.luxury',
      seller: 'seller@reloop.luxury',
      buyer: 'buyer@reloop.luxury',
    };
    try {
      const u = await api.login(emailMap[role]);
      setUser(u);
      success(`Switched role to ${role.toUpperCase()}`, `Active session as ${u.name}`);
    } catch (err: any) {
      error('Failed to switch user', err.message);
    }
  };

  const refreshUser = useCallback(async () => {
    if (!user) return;
    const fresh = await api.getSeller(user.id);
    if (fresh) {
      setUser(fresh);
      api.setCurrentUser(fresh);
    }
  }, [user]);

  const isAdmin = user?.role === 'admin';
  const isSeller = user?.role === 'seller' || user?.role === 'admin';
  const isBuyer = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
        switchDemoUser,
        isAdmin,
        isSeller,
        isBuyer,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
