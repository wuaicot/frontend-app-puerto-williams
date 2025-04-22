import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Importa otros servicios de Firebase que necesites (Firestore, Storage, etc.) si los usas

// Configuración de Firebase - ¡Reemplaza con tus credenciales!
// Es MUY recomendable usar variables de entorno para esto.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID // Opcional
};

// Inicializar Firebase (asegurándose de que no se inicialice múltiples veces)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exportar servicios de Firebase que usarás en la app
const auth = getAuth(app);
// const db = getFirestore(app); // Ejemplo si usaras Firestore
// const storage = getStorage(app); // Ejemplo si usaras Storage

export { app, auth /*, db, storage */ };