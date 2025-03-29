// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  register: (
    userData: Omit<User, "_id" | "role"> & { password: string }
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  firebaseLogin: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const clearError = useCallback(() => setError(null), []);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url) throw new Error("API URL is not defined");

      const response = await axios.get(`${url}/auth/me`, {
        withCredentials: true,
      });

      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      if (axios.isAxiosError(error)) {
        // setError(error.response?.data?.message || "Session expired");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      clearError();
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url)
        throw new Error("API URL is not defined in environment variables.");

      const response = await axios.post(
        `${url}/auth/login/email`,
        { email, password },
        { withCredentials: true } // Include cookies in the request
      );

      setUser(response.data.user);
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const firebaseLogin = async (idToken: string) => {
    try {
      setLoading(true);
      clearError();
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url) throw new Error("API URL is not defined");

      const response = await axios.post(
        `${url}/auth/login/firebase`,
        { idToken },
        { withCredentials: true }
      );

      setUser(response.data.user);
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Firebase login failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: Omit<User, "_id" | "role"> & { password: string }
  ) => {
    try {
      setLoading(true);
      clearError();
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url)
        throw new Error("API URL is not defined in environment variables.");

      const response = await axios.post(`${url}/auth/register`, userData, {
        withCredentials: true, // Include cookies in the request
      });

      setUser(response.data.user);
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Registration failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      clearError();
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url)
        throw new Error("API URL is not defined in environment variables.");

      await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });

      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Logout failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        error,
        register,
        login,
        firebaseLogin,
        logout,
        checkAuth,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
