'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, AccountType } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  register: (
    fullName: string, 
    email: string, 
    password?: string, 
    accountType?: AccountType, 
    orgName?: string
  ) => Promise<{ success: boolean; error?: string }>;
  switchRole: (newRole: UserRole) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize Supabase Auth session & profile listener
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            await loadUserProfile(session.user.id, session.user.email || '');
          } else if (mounted) {
            // Read cached local profile fallback if present
            const saved = localStorage.getItem('nexa_user_profile');
            if (saved) {
              setUser(JSON.parse(saved));
            }
          }
        } else {
          const saved = localStorage.getItem('nexa_user_profile');
          if (saved && mounted) {
            setUser(JSON.parse(saved));
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initAuth();

    // Listen to Supabase Auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        localStorage.removeItem('nexa_user_profile');
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (userId: string, email: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile && !error) {
        const loadedUser: UserProfile = {
          id: profile.id,
          email: profile.email || email,
          fullName: profile.full_name || email.split('@')[0],
          role: (profile.role as UserRole) || 'user',
          accountType: (profile.account_type as AccountType) || 'personal',
          organizationId: profile.organization_id || undefined,
          organizationName: profile.organization_name || undefined,
          emailVerified: true,
          createdAt: profile.created_at || new Date().toISOString()
        };
        setUser(loadedUser);
        localStorage.setItem('nexa_user_profile', JSON.stringify(loadedUser));
      } else {
        // Create initial profile record if missing
        const newProf: UserProfile = {
          id: userId,
          email,
          fullName: email.split('@')[0].toUpperCase(),
          role: 'user',
          accountType: 'personal',
          emailVerified: true,
          createdAt: new Date().toISOString()
        };
        setUser(newProf);
        localStorage.setItem('nexa_user_profile', JSON.stringify(newProf));
      }
    } catch (e) {
      console.warn('Profile fetch error, using session fallback:', e);
    }
  };

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          await loadUserProfile(data.user.id, data.user.email || email);
        }
      } else {
        // Local mode fallback
        const loggedUser: UserProfile = {
          id: `usr_${Math.random().toString(36).substring(2, 9)}`,
          email,
          fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
          role: 'client_admin',
          accountType: 'organization',
          organizationName: `${email.split('@')[0]}'s Organization`,
          emailVerified: true,
          createdAt: new Date().toISOString()
        };
        setUser(loggedUser);
        localStorage.setItem('nexa_user_profile', JSON.stringify(loggedUser));
      }
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed.' };
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) {
        throw error;
      }
    } else {
      await login('user@enterprise.com');
    }
  };

  const register = async (
    fullName: string, 
    email: string, 
    password?: string, 
    accountType: AccountType = 'personal', 
    orgName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && password) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const role: UserRole = accountType === 'organization' ? 'client_admin' : 'user';

          // Insert Profile into Supabase
          await supabase.from('profiles').insert([{
            id: data.user.id,
            email,
            full_name: fullName,
            role,
            account_type: accountType
          }]);

          // Create Organization if selected
          if (accountType === 'organization' && orgName) {
            const { data: orgData } = await supabase.from('organizations').insert([{
              name: orgName,
              owner_id: data.user.id
            }]).select().single();

            if (orgData) {
              await supabase.from('organization_members').insert([{
                organization_id: orgData.id,
                user_id: data.user.id,
                role: 'client_admin'
              }]);
              await supabase.from('profiles').update({ organization_id: orgData.id }).eq('id', data.user.id);
            }
          }

          await loadUserProfile(data.user.id, email);
        }
      } else {
        // Fallback local registration
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
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed.' };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('nexa_user_profile');
    setIsLoading(false);
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('nexa_user_profile', JSON.stringify(updated));
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await loadUserProfile(user.id, user.email);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        logout,
        register,
        switchRole,
        refreshProfile
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
