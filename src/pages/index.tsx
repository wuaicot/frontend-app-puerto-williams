// client/src/pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  AuthErrorCodes,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import apiClient from '../lib/axios';

export default function LandingPage() {
  const router = useRouter();

  // Handler genérico para Admin (login) y Registrarse
  const handleAuthAction = async (type: 'register' | 'login') => {
    await signOut(auth);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const doRedirect = () => signInWithRedirect(auth, provider);

    try {
      // Intentamos el popup
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      const endpoint = type === 'register' ? '/auth/register' : '/auth/login';
      const { data: userData } = await apiClient.post(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

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
      // Si el popup fue bloqueado o no soportado, usamos redirect
      if (
        error.code === AuthErrorCodes.POPUP_BLOCKED ||
        error.code === AuthErrorCodes.OPERATION_NOT_SUPPORTED
      ) {
        console.warn('Popup bloqueado o no soportado, usando redirect...');
        return doRedirect();
      }
      console.error(`Error en ${type}:`, error);
      alert(error.response?.data?.message || `Ocurrió un error durante ${type}.`);
    }
  };

  // Handler específico para Conserjería
  const handleConserjeriaClick = async () => {
    await signOut(auth);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const doRedirect = () => signInWithRedirect(auth, provider);

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      const { data } = await apiClient.get<{
        status: 'PENDING' | 'APPROVED' | 'REJECTED';
        role: string;
      }>('/auth/status', {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      const { status, role } = data;
      if (status === 'PENDING') {
        router.push('/pendiente-aprobacion');
      } else if (status === 'APPROVED') {
        const area = role.toLowerCase();
        router.push(`/conserjeria/${area}`);
      } else {
        alert('Acceso denegado. Solicitud rechazada.');
      }
    } catch (error: any) {
      if (
        error.code === AuthErrorCodes.POPUP_BLOCKED ||
        error.code === AuthErrorCodes.OPERATION_NOT_SUPPORTED
      ) {
        console.warn('Popup bloqueado o no soportado, usando redirect...');
        return doRedirect();
      }
      console.error('Error en login Conserjería:', error);
      alert(error.response?.data?.message || 'Error durante el login de Conserjería.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="absolute top-16 text-xl mb-12">Puerto Williams App</h1>

      <div className="flex flex-col -mt-8 items-center gap-y-6">
        <button
          onClick={() => handleAuthAction('login')}
          className="bg-white text-black font-semibold py-2 px-10 rounded-full shadow-md hover:bg-blue-200 hover:text-green-500 transition min-w-[200px]"
        >
          Admin.
        </button>

        <button
          onClick={() => handleAuthAction('register')}
          className="bg-black text-white border border-white font-semibold py-1 px-8 rounded-md shadow-md hover:bg-green-800 hover:border-white hover:text-blue-500 transition min-w-[180px]"
        >
          Registrarse
        </button>

        <button
          onClick={handleConserjeriaClick}
          className="bg-white text-black font-semibold py-2 px-10 rounded-full shadow-md hover:bg-gray-200 transition min-w-[200px]"
        >
          Conserjería
        </button>
      </div>
    </div>
  );
}
