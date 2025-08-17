import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mitralink.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("token");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Instead of redirecting here, just clear token
        localStorage.removeItem("token");
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);



