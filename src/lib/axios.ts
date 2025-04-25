import axios from "axios";
import { auth } from "./firebase";

// Crea una instancia de Axios con configuración global
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: adjunta automáticamente el token de Firebase al header Authorization
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error("No se pudo obtener el token de Firebase:", err);
        // Puedes hacer logout aquí si es necesario
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
