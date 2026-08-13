import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AuthResponse, User } from './types';

type AuthContextValue = { user: User | null; login: (data: AuthResponse) => void; logout: () => void };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem('eduroom_user') ?? 'null'); } catch { return null; }
  });
  const value = useMemo(() => ({
    user,
    login(data: AuthResponse) { localStorage.setItem('eduroom_token', data.token); localStorage.setItem('eduroom_user', JSON.stringify(data.user)); setUser(data.user); },
    logout() { localStorage.removeItem('eduroom_token'); localStorage.removeItem('eduroom_user'); setUser(null); }
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth requiere AuthProvider');
  return value;
}

