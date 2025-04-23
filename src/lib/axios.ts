//client/src/lib/axios.ts
import axios from 'axios';
import { auth } from './firebase'; // Importamos la instancia de auth de Firebase

// Creamos una instancia de Axios con configuración base
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api', // URL base de tu API backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token de autenticación de Firebase a cada solicitud
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser; // Obtiene el usuario actual de Firebase Auth

    if (user) {
      try {
        const token = await user.getIdToken(); // Obtiene el ID token actual (se refresca automáticamente si es necesario)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Añade el token al header
        }
      } catch (error) {
        console.error('Error getting Firebase token:', error);
        // Podrías manejar el error aquí (ej: desloguear al usuario)
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;