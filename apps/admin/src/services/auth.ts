import axios from "../lib/axios";

export async function login(email: string, password: string) {
  const response = await axios.post(
    "/auth/login/email",
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return response.data.user; // return user: {_id, email, name, role}
}

export async function getCurrentUser() {
  const response = await axios.get("/auth/me", {
    withCredentials: true,
  });

  return response.data;
}

export async function logout() {
  await axios.post("/auth/logout");
}
