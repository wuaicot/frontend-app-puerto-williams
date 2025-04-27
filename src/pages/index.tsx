// client/src/pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import apiClient from '../lib/axios';

export default function LandingPage() {
  const router = useRouter();

  const handleAuthAction = async (type: 'register' | 'login') => {
    // Aseguramos que no haya sesión previa
    await signOut(auth);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // Autenticación con popup usando auth directamente
      const userCredential = await signInWithPopup(auth, provider);
      await userCredential.user.getIdToken();

      const endpoint = type === 'register' ? '/auth/register' : '/auth/login';
      const { data: userData } = await apiClient.post(endpoint);

      if (type === 'register') {
        userData.status === 'PENDING'
          ? router.push('/pendiente-aprobacion')
          : router.push('/conserjeria/mainView');
      } else {
        if (userData.role === 'ADMIN' && userData.status === 'APPROVED') {
          router.push('/admin/mainView');
        } else {
          alert('No tienes permisos para acceder como Administrador.');
        }
      }
    } catch (error: any) {
      console.error(`Error en ${type}:`, error);
      alert(error.response?.data?.message || `Ocurrió un error durante ${type}.`);
    }
  };

  const handleConserjeriaClick = () => {
    // Ruta principal de Conserjería
    router.push('/conserjeria/mainView');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="absolute top-5 text-xl mb-12">Puerto Williams App</h1>

      <div className="flex flex-col items-center gap-y-6">
        <button
          onClick={() => handleAuthAction('login')}
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px]"
        >
          Admin.
        </button>

        <button
          onClick={() => handleAuthAction('register')}
          className="bg-black text-white border border-white font-semibold py-2 px-8 rounded-md shadow-md hover:bg-gray-800 hover:border-gray-400 transition duration-300 ease-in-out min-w-[200px]"
        >
          Registrarse
        </button>

        <button
          onClick={handleConserjeriaClick}
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px]"
        >
          Conserjeria
        </button>
      </div>
    </div>
  );
}