// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // Replace with your User type
  register: (
    userData: Omit<User, "_id" | "role"> & { password: string }
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url)
        throw new Error("API URL is not defined in environment variables.");

      const response = await axios.post(
        `${url}/auth/login/email`,
        { email, password },
        { withCredentials: true } // Include cookies in the request
      );

      const { user: userData } = response.data;

      // Update state
      setIsAuthenticated(true);
      setUser(userData);

      // Redirect to dashboard or home
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (
    userData: Omit<User, "_id" | "role"> & { password: string }
  ) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url)
        throw new Error("API URL is not defined in environment variables.");

      await axios.post(`${url}/auth/register`, userData, {
        withCredentials: true, // Include cookies in the request
      });

      // Optionally, you can log the user in after registration
      await login(userData.email, userData.password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, register, login, logout }}
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
