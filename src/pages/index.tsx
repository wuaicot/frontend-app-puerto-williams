// client/src/pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../lib/firebase';
import apiClient from '../lib/axios';

export default function LandingPage() {
  const router = useRouter();
  const firebaseAuth = getAuth(app);

  const handleRegisterClick = async () => {
    console.log("Botón Registrarse presionado");

    // 1) Asegurarnos de que no haya sesión previa
    await signOut(firebaseAuth);

    // 2) Configurar el provider para que muestre selector de cuenta
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      // 3) Lanzar el popup de login
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const idToken = await userCredential.user.getIdToken();

      // 4) Llamada al backend
      const { data: userData } = await apiClient.post('/auth/register');

      console.log("Respuesta registro:", userData);

      // 5) Redirecciones según estado
      if (userData.status === 'PENDING') {
        router.push('/pendiente-aprobacion');
      } else {
        // Status APPROVED (quizá un test anterior), ir a la pantalla main de Conserjería
        router.push('/conserjeria/mainView');
      }
    } catch (error: any) {
      console.error("Error durante el registro:", error);
      alert(error.response?.data?.message || "Ocurrió un error al registrarse.");
    }
  };

  const handleAdminClick = async () => {
    console.log("Botón Admin presionado");
    await signOut(firebaseAuth);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const idToken = await userCredential.user.getIdToken();

      const { data: userData } = await apiClient.post('/auth/login');

      console.log("Login Admin exitoso:", userData);

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
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px]"
        >
          Admin.
        </button>

        <button
          onClick={handleRegisterClick}
          className="bg-black text-white border border-white font-semibold py-2 px-8 rounded-md shadow-md hover:bg-gray-800 hover:border-gray-400 transition duration-300 ease-in-out min-w-[200px]"
        >
          Registrarse
        </button>

        <button
          onClick={handleConserjeClick}
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px]"
        >
          Conserje
        </button>
      </div>
    </div>
  );
}
