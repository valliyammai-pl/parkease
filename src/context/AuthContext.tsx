import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { initialUserProfile } from '../data/initialState';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, rememberMe?: boolean) => boolean;
  signup: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'parkease_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // safe fallback
    }
    // Seed Aarav Sharma as logged in by default so the demo feels immediately lively and functional!
    return initialUserProfile;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // safe fallback
    }
  }, [user]);

  const login = (email: string, rememberMe: boolean = true): boolean => {
    const newUser: UserProfile = {
      ...initialUserProfile,
      email: email.trim().toLowerCase(),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      rememberMe,
    };
    setUser(newUser);
    return true;
  };

  const signup = (name: string, email: string, phone: string): boolean => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      joinedDate: 'Oct 2026',
      rememberMe: true,
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const demoLogin = () => {
    setUser(initialUserProfile);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
