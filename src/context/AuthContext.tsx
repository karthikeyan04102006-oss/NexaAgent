'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, AccountType } from '@/types';
import { DEMO_USER } from '@/lib/demo-data';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  register: (fullName: string, email: string, accountType: AccountType, role?: UserRole, orgName?: string) => Promise<void>;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Read saved profile if available
  useEffect(() => {
    const saved = localStorage.getItem('nexa_user_profile');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        setUser(DEMO_USER);
      }
    }
  }, []);

  const login = async (email: string, role: UserRole = 'client_admin') => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const loggedUser: UserProfile = {
      ...DEMO_USER,
      email: email,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase() || 'Alex Vance',
      role: role
    };
    setUser(loggedUser);
    localStorage.setItem('nexa_user_profile', JSON.stringify(loggedUser));
    setIsLoading(false);
  };

  const register = async (fullName: string, email: string, accountType: AccountType, role: UserRole = 'user', orgName?: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      email,
      fullName,
      role: accountType === 'organization' ? 'client_admin' : 'user',
      accountType,
      organizationName: orgName || (accountType === 'organization' ? `${fullName}'s Org` : undefined),
      organizationId: accountType === 'organization' ? `org_${Math.random().toString(36).substring(2, 9)}` : undefined,
      emailVerified: true,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('nexa_user_profile', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexa_user_profile');
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('nexa_user_profile', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        switchRole
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
