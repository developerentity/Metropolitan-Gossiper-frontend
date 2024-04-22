"use client";

import axios from "axios";
import { logger } from "@/lib/default-logger";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("access-token");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.error(error);
    Promise.reject(
      error?.response?.data || error?.response || "Something went wrong"
    );
  }
);

export default axiosInstance;
