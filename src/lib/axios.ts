import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';
import { app } from './firebase';

const firebaseAuth = getAuth(app);

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = firebaseAuth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers!['Authorization'] = `Bearer ${token}`;
      } catch {
        await signOut(firebaseAuth);
        window.location.href = '/';
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut(firebaseAuth).catch(console.error);
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
