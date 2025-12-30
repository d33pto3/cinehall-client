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
    try {
      console.log("AuthContext: refreshUser starting...");
      const userData = await fetchCurrentUser();
      console.log("AuthContext: fetchCurrentUser result:", userData);
      setUser(userData);
    } catch (error) {
      console.error("AuthContext: refreshUser error:", error);
      // If we get an unauthorized error, make sure to clear local state
      setUser(null);
      // Also try to clear cookies via server action if possible (client-side we can't clear httpOnly)
      // This helps break redirect loops where middleware thinks we are logged in but server says no.
      import("@/lib/auth-server-actions").then(({ removeAuthCookie }) => {
        removeAuthCookie();
      });
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
