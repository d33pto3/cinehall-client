import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login/email", { email, password });

  const { token, user } = response.data;

  await AsyncStorage.setItem("token", token);
  await AsyncStorage.setItem("user", user);

  return user;
}

export async function logout() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
}

export async function getStoreToken() {
  return AsyncStorage.getItem("token");
}
