"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { User, fetchCurrentUser } from "@/lib/auth-actions";
import { validateAndCleanupCookies } from "@/lib/cookie-utils";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Core function to sync state with server
  const refreshUser = useCallback(async () => {
    // Only set loading true if it's the very first load or explicit refresh if needed.
    // However, to keep it "boring", let's just fetch.
    // We might NOT want to set loading=true on every background refresh to avoid UI flickering.
    // For now, let's keep it simple: initial load sets loading, manual refresh waits for promise.
    
    try {
      console.log("AuthContext: refreshUser starting...");
      const userData = await fetchCurrentUser();
      console.log("AuthContext: fetchCurrentUser result:", userData);
      setUser(userData);
    } catch (error) {
      console.error("AuthContext: refreshUser error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial check on mount
  useEffect(() => {
    // 1. Cleanup stale cookies before attempting to fetch user
    validateAndCleanupCookies();
    
    // 2. Refresh user state
    refreshUser();
  }, [refreshUser]);

  const value = useMemo(
    () => ({
      user,
      loading,
      refreshUser,
    }),
    [user, loading, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
