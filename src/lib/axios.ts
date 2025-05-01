import axios from "axios";
import { getAuth, signOut, User } from "firebase/auth";
import { app } from "./firebase";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
console.log("API Base URL:", API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const firebaseAuth = getAuth(app);

apiClient.interceptors.request.use(
  async (config) => {
    const user: User | null = firebaseAuth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${token}`;
      } catch (err) {
        console.error("Error obteniendo ID token:", err);
        await signOut(firebaseAuth);
        window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try { await signOut(firebaseAuth); } catch {}
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
