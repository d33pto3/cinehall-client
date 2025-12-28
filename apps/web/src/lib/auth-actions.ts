import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";

// Types
export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role?: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone: string;
}

const getApiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error("API URL is not defined in environment variables.");
  return url;
};

// --- API Actions ---

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const url = getApiUrl();
    const response = await axios.get(`${url}/auth/me`, {
      withCredentials: true,
    });
    console.log("fetchCurrentUser success:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log("fetchCurrentUser 401 (not logged in)");
      return null;
    }
    console.error("fetchCurrentUser error:", error);
    return null;
  }
};

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const url = getApiUrl();
    const response = await axios.post(
      `${url}/auth/login/email`,
      { email, password },
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Invalid email or password");
    }
    throw error;
  }
};

export const loginWithFirebase = async (): Promise<User> => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const idToken = await userCredential.user.getIdToken();

  const url = getApiUrl();
  const response = await axios.post(
    `${url}/auth/login/firebase`,
    { idToken },
    { withCredentials: true }
  );
  return response.data.user;
};

export const registerUser = async (data: RegisterData): Promise<User> => {
  const url = getApiUrl();
  const response = await axios.post(`${url}/auth/register`, data, {
    withCredentials: true,
  });
  return response.data.user;
};

export const logoutUser = async (): Promise<void> => {
  const url = getApiUrl();
  try {
    await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout failed (server might be down), but clearing client state.", error);
    // Suppress error, just let client clear state
  }
};
