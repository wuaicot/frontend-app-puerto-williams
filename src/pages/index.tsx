//client/src/pages/index.tsx

import React from 'react';
import { useRouter } from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../lib/firebase';
import apiClient from '../lib/axios';

export default function LandingPage() {
  const router = useRouter();
  const firebaseAuth = getAuth(app);

  const handleRegisterClick = async () => {
    console.log("Botón Registrarse presionado");
    const provider = new GoogleAuthProvider();

    try {
      // Autenticación con Google
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // Llamada al endpoint de registro, enviando el token en headers
      const response = await apiClient.post(
        '/auth/register',
        {}, // body vacío
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const userData = response.data;
      console.log("Registro/login existente:", userData);

      // Redirigir según estado
      if (userData.status === 'PENDING') {
        router.push('/pendiente-aprobacion');
      } else {
        router.push('/conserjeria');
      }
    } catch (error: any) {
      console.error("Error durante el registro:", error);
      alert(error.response?.data?.message || "Ocurrió un error al registrarse.");
    }
  };

  const handleAdminClick = async () => {
    console.log("Botón Admin presionado");
    const provider = new GoogleAuthProvider();

    try {
      // Autenticación con Google
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // Llamada al endpoint de login admin
      const response = await apiClient.post(
        '/auth/login',
        {}, // body vacío
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const userData = response.data;
      console.log("Login Admin exitoso:", userData);

      // Validar rol y estado
      if (userData.role === 'ADMIN' && userData.status === 'APPROVED') {
        router.push('/admin/mainView');
      } else {
        alert("No tienes permisos para acceder como Administrador.");
      }
    } catch (error: any) {
      console.error("Error en login Admin:", error);
      alert(error.response?.data?.message || "Error en el login del administrador.");
    }
  };

  const handleConserjeClick = () => {
    console.log("Botón Conserje presionado");
    alert("Funcionalidad de login Conserje aún no implementada.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="absolute top-5 text-xl mb-12">Puerto Williams App</h1>

      <div className="flex flex-col items-center gap-y-6">
        <button
          onClick={handleAdminClick}
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px] text-center"
        >
          Admin.
        </button>

        <button
          onClick={handleRegisterClick}
          className="bg-black text-white border border-white font-semibold py-2 px-8 rounded-md shadow-md hover:bg-gray-800 hover:border-gray-400 transition duration-300 ease-in-out min-w-[200px] text-center"
        >
          Registrarse
        </button>

        <button
          onClick={handleConserjeClick}
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px] text-center"
        >
          Conserje
        </button>
      </div>
    </div>
  );
}

