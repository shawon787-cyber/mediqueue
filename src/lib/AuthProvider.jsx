"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AUTH_CHANGED_EVENT,
  clearAuthStorage,
  getToken,
  getUser,
  setAuthStorage,
} from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const token = getToken();
    const user = getUser();

    return {
      user,
      token,
      isLoggedIn: Boolean(token),
      isHydrated: true,
    };
  });

  const syncAuth = useCallback(() => {
    const token = getToken();
    const user = getUser();

    setAuthState({
      user,
      token,
      isLoggedIn: Boolean(token),
      isHydrated: true,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncAuth);
    window.addEventListener(AUTH_CHANGED_EVENT, syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener(AUTH_CHANGED_EVENT, syncAuth);
    };
  }, [syncAuth]);

  const login = useCallback(
    (token, user) => {
      setAuthStorage(token, user);
      syncAuth();
    },
    [syncAuth]
  );

  const logout = useCallback(() => {
    clearAuthStorage();
    setAuthState({
      user: null,
      token: null,
      isLoggedIn: false,
      isHydrated: true,
    });
  }, []);

  const value = useMemo(
    () => ({
      ...authState,
      login,
      logout,
    }),
    [authState, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
