import axios from "@/lib/axios";
import { HallProps } from "../hallId/HallOverview";

export const getHalls = async (
  params?: Record<string, any>
): Promise<{ halls: HallProps[]; pages: number }> => {
  const res = await axios.get(`/hall`, { params });
  return { halls: res.data.data, pages: res.data.pages };
};
