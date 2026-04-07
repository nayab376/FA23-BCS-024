import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser, loginUser, logoutUser, registerUser } from "../api";

const AuthContext = createContext(null);
const storageKey = "adflow_pro_auth";

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) {
      setLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (!parsed?.token) {
        localStorage.removeItem(storageKey);
        setLoading(false);
        return;
      }
      setToken(parsed.token);
      fetchCurrentUser(parsed.token)
        .then((res) => setUser(res.user))
        .catch(() => {
          localStorage.removeItem(storageKey);
          setToken("");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } catch (_error) {
      localStorage.removeItem(storageKey);
      setToken("");
      setUser(null);
      setLoading(false);
    }
  }, []);

  const persist = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(storageKey, JSON.stringify({ token: nextToken }));
  };

  const login = useCallback(async (payload) => {
    const res = await loginUser(payload);
    persist(res.token, res.user);
    return res.user;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await registerUser(payload);
    persist(res.token, res.user);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      try {
        await logoutUser(token);
      } catch (_error) {
        // Ignore logout network errors.
      }
    }
    setToken("");
    setUser(null);
    localStorage.removeItem(storageKey);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
    }),
    [token, user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
