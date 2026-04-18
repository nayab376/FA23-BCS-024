import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type UserRole = 'buyer' | 'seller' | 'admin' | 'super';

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  requireAuth: (action?: string) => boolean;
  authPrompt: string | null;
  setAuthPrompt: (prompt: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'adflow.auth.user.v1';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });
  const [authPrompt, setAuthPrompt] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (u) => {
        setUser(u);
        setAuthPrompt(null);
      },
      logout: () => setUser(null),
      requireAuth: (action) => {
        if (user) return true;
        setAuthPrompt(action ?? 'continue');
        return false;
      },
      authPrompt,
      setAuthPrompt,
    }),
    [user, authPrompt],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export const ROLE_LABEL: Record<UserRole, string> = {
  buyer: 'Buyer',
  seller: 'Seller',
  admin: 'Admin',
  super: 'Super Admin',
};
