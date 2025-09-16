import axios from "@/lib/axios";
import { User } from "../ListOfUsers";

export const getUsersByRole = async (
  role: string,
  params?: Record<string, any>
): Promise<{ users: User[]; pages: number }> => {
  const res = await axios.get(`/user?role=${role}`, { params });
  return { users: res.data.data, pages: res.data.pages };
};
