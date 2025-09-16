import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  login as loginAPI,
  logout as logoutAPI,
  getCurrentUser,
} from "../services/auth";
import { useNavigate } from "react-router-dom";

type UserRole = "admin" | "hallOwner";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user on initial load ONLY
  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);

        // only redirect if on root or login page
        const currentPath = location.pathname;
        if (
          currentPath === "/" ||
          currentPath === "/login" ||
          currentPath === ""
        ) {
          if (user?.role === "admin") navigate("/admin");
          else if (user?.role === "hallowner") navigate("/hallowner");
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []); // Empty dependency array = runs once on mount

  const login = async (email: string, password: string) => {
    const user = await loginAPI(email, password); // Sets cookie via backend
    setUser(user);
    return user;
  };

  const logout = async () => {
    await logoutAPI();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
