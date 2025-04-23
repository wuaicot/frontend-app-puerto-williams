import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import apiClient from '../lib/axios';
import { useRouter } from 'next/router';

export default function LandingPage() {
  const router = useRouter();

  // --- Función para manejar el clic en "Registrarse" ---
  const handleRegisterClick = async () => {
    console.log("Botón Registrarse presionado");
    const provider = new GoogleAuthProvider();

    try {
      console.log("Iniciando popup de Google Sign-In...");
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("¡Login con Google exitoso!", user);

      const idToken = await user.getIdToken();
      console.log("ID Token obtenido:", idToken);

      console.log("Enviando token al backend (/api/auth/register)...");
      const response = await apiClient.post('/auth/register'); // Token enviado vía interceptor

      const userData = response.data;
      console.log("Respuesta del backend (registro):", userData);

      // Redirigir según el estado del usuario
      if (userData.status === 'PENDING') {
        router.push('/pendiente-aprobacion');
      } else {
        router.push('/conserjeria');
      }

    } catch (error: any) {
      console.error("Error durante el proceso de registro:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        alert("Proceso de registro cancelado (ventana cerrada).");
      } else if (error.response) {
        console.error("Error data:", error.response.data);
        alert(`Error del servidor: ${error.response.data?.message || 'Error desconocido'}`);
      } else {
        alert("Ocurrió un error durante el registro. Intenta de nuevo.");
      }
    }
  };

  const handleAdminClick = () => {
    console.log("Botón Admin presionado");
    alert("Funcionalidad de login Admin aún no implementada.");
  };

  const handleConserjeClick = () => {
    console.log("Botón Conserje presionado");
    alert("Funcionalidad de login Conserje aún no implementada.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="absolute top-5 text-xl mb-12">landingPage</h1>

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
