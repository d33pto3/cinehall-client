import axios from "@/lib/axios";

export const getAdminStats = async () => {
  const response = await axios.get("/dashboard/admin/stats");
  return response.data;
};

export const getAdminChartData = async (range: string = "90d") => {
  const response = await axios.get(`/dashboard/admin/chart?range=${range}`);
  return response.data;
};

export const getAdminRecentBookings = async () => {
  const response = await axios.get("/dashboard/admin/bookings");
  return response.data;
};

export const getHallOwnerStats = async () => {
  const response = await axios.get("/dashboard/hallowner/stats");
  return response.data;
};

export const getHallOwnerChartData = async (range: string = "90d") => {
  const response = await axios.get(`/dashboard/hallowner/chart?range=${range}`);
  return response.data;
};

export const getHallOwnerRecentBookings = async () => {
  const response = await axios.get("/dashboard/hallowner/bookings");
  return response.data;
};
