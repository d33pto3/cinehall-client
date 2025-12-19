import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

// Optional: handle unauthorized errors globally (NO redirects)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Just log or let the caller handle it
      console.warn("Unauthorized request (401)");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
