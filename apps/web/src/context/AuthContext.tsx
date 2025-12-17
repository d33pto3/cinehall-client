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
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";

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
  firebaseLogin: () => Promise<void>;
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

      const userData = response.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store user data in localStorage as backup
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      
      // Try to restore from localStorage if API call fails
      // Only if it's NOT a 401 (Unauthorized) error
      const isUnauthorized = axios.isAxiosError(error) && error.response?.status === 401;
      
      if (typeof window !== "undefined" && !isUnauthorized) {
        const storedUser = localStorage.getItem("user");
        const storedAuth = localStorage.getItem("isAuthenticated");
        
        if (storedUser && storedAuth === "true") {
          console.log("Restoring auth from localStorage");
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          setLoading(false); // Ensure loading is set to false if restored
          return; // Don't clear the state
        }
      }
      
      setIsAuthenticated(false);
      setUser(null);
      
      // Clear localStorage on auth failure
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // If we get a 401, the cookie might be invalid or expired.
          // We should try to call logout to clear the cookie if possible.
          try {
            const url = process.env.NEXT_PUBLIC_API_URL;
            if (url) {
                await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });
            }
          } catch (e) {
            // Ignore logout error
          }
        }
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

      const userData = response.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
      }
      
      router.push("/");
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      
      // Clear localStorage on login failure
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const firebaseLogin = async () => {
    try {
      setLoading(true);
      clearError();
      const userCredential = await signInWithPopup(auth, googleProvider);
      const idToken = await userCredential.user.getIdToken();

      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url) throw new Error("API URL is not defined");

      // send token to backend
      const response = await axios.post(
        `${url}/auth/login/firebase`,
        { idToken },
        { withCredentials: true }
      );

      const userData = response.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
      }
      
      router.push("/");
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      
      // Clear localStorage on firebase login failure
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
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

      const registeredUser = response.data.user;
      setUser(registeredUser);
      setIsAuthenticated(true);
      
      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(registeredUser));
        localStorage.setItem("isAuthenticated", "true");
      }
      
      router.push("/");
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      
      // Clear localStorage on registration failure
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
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
      
      // Clear localStorage on logout
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
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
