import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const apiUrl = axios.create({
  baseURL: BASE_URL,
});
// This interceptor runs automatically BEFORE every single request leaves your app
apiUrl.interceptors.request.use(
  (config) => {
    // 1. Grab the token from localStorage
    const token = localStorage.getItem("token");

    // 2. If it exists, inject it into the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiUrl;
