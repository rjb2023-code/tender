'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/data';

const USER_ROLE_KEY = 'tenderflow_user_role';

interface UserContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem(USER_ROLE_KEY) as UserRole | null;
      if (storedRole) {
        const currentUser = users.find(u => u.role === storedRole) || null;
        setUser(currentUser);
        if (pathname === '/') {
           router.replace('/dashboard');
        }
      } else if (pathname !== '/') {
        router.replace('/');
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router]);

  const login = useCallback((role: UserRole) => {
    try {
      localStorage.setItem(USER_ROLE_KEY, role);
      const currentUser = users.find(u => u.role === role) || null;
      setUser(currentUser);
    } catch (error) {
       console.error("Could not access localStorage:", error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(USER_ROLE_KEY);
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, [router]);

  const value = { user, login, logout, isLoading };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
