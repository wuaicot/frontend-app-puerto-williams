import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";

// Instancia de Axios con configuración base
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const firebaseAuth = getAuth(app);

// Interceptor de petición: añade token Firebase en Authorization
apiClient.interceptors.request.use(
  async (config) => {
    const user = firebaseAuth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        // Asegúrate de usar config.headers['Authorization']
        config.headers.set('Authorization', `Bearer ${token}`);
      } catch (err) {
        console.error("No se pudo obtener el token de Firebase:", err);
        // Forzar logout y redirección al landing
        await signOut(firebaseAuth);
        window.location.href = "/";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta: si recibimos 401, cerramos sesión y redirigimos
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await signOut(firebaseAuth);
      } catch (err) {
        console.error("Error al cerrar sesión después de 401:", err);
      }
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
