import { create } from "zustand";
import {
  login as loginService,
  logout as logoutService,
} from "../services/authServices";

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: async (email, password) => {
    const user = await loginService(email, password);
    set({ user, isLoggedIn: true });
  },

  logout: async () => {
    await logoutService();
    set({ user: null, isLoggedIn: false });
  },
}));
