import axios from "axios";

const apiUrl = axios.create({
  baseURL: "http://localhost:3000/api",
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
