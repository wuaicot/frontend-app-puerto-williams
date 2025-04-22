import React from 'react';
// Importaciones de Firebase necesarias para Google Auth
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Nuestra instancia de auth inicializada
import apiClient from '../lib/axios'; // Nuestra instancia de Axios configurada

// Componente funcional para la página de inicio
export default function LandingPage() {

  // --- Función para manejar el clic en "Registrarse" ---
  const handleRegisterClick = async () => {
    console.log("Botón Registrarse presionado");
    const provider = new GoogleAuthProvider(); // Proveedor de autenticación de Google

    try {
      console.log("Iniciando popup de Google Sign-In...");
      // Inicia el proceso de login con Google a través de una ventana emergente
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("¡Login con Google exitoso!", user);

      // Obtener el ID Token de Firebase del usuario
      console.log("Obteniendo ID Token...");
      const idToken = await user.getIdToken();
      console.log("ID Token obtenido:", idToken); // No mostrar en producción real

      // Enviar el token al backend para registrar al usuario
      console.log("Enviando token al backend (/api/auth/register)...");
      // Nota: El interceptor de Axios debería añadir el token al header 'Authorization'
      // pero podrías enviarlo en el body si tu backend lo prefiere:
      // const response = await apiClient.post('/auth/register', { token: idToken });
      // Por ahora, confiamos en el interceptor:
      const response = await apiClient.post('/auth/register'); // Endpoint a crear en el backend

      console.log("Respuesta del backend (registro):", response.data);
      alert("¡Registro iniciado! Estado pendiente de aprobación por administrador."); // Mensaje temporal

      // TODO: Redirigir a una página de "Pendiente de Aprobación"
      // router.push('/pending-approval'); // Necesitarás importar 'useRouter' de 'next/router'

    } catch (error: any) {
      // Manejar errores específicos de Firebase Auth o de la llamada API
      console.error("Error durante el proceso de registro:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        alert("Proceso de registro cancelado (ventana cerrada).");
      } else if (error.response) {
        // Error desde la respuesta del backend
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        alert(`Error del servidor: ${error.response.data?.message || 'Error desconocido'}`);
      } else {
        alert("Ocurrió un error durante el registro. Intenta de nuevo.");
      }
    }
  };

  // --- Función para manejar el clic en "Admin." (Placeholder) ---
  const handleAdminClick = () => {
    console.log("Botón Admin presionado");
    alert("Funcionalidad de login Admin aún no implementada.");
    // TODO: Implementar lógica de login Admin (similar a Registrarse pero llamando a /auth/login)
  };

  // --- Función para manejar el clic en "Conserje" (Placeholder) ---
  const handleConserjeClick = () => {
    console.log("Botón Conserje presionado");
    alert("Funcionalidad de login Conserje aún no implementada.");
    // TODO: Implementar lógica de login Conserje (similar a Registrarse pero llamando a /auth/login)
  };


  return (
    // Contenedor principal: fondo negro, altura completa, centrado flex
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">

      {/* Título de la página (opcional, como en la imagen) */}
      <h1 className="absolute top-5 text-xl mb-12">landingPage</h1>

      {/* Contenedor de los botones */}
      <div className="flex flex-col items-center gap-y-6">

        {/* Botón Admin */}
        <button
          onClick={handleAdminClick} // Llama a la función placeholder
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px] text-center"
        >
          Admin.
        </button>

        {/* Botón Registrarse */}
        <button
          onClick={handleRegisterClick} // Llama a la función implementada
          className="bg-black text-white border border-white font-semibold py-2 px-8 rounded-md shadow-md hover:bg-gray-800 hover:border-gray-400 transition duration-300 ease-in-out min-w-[200px] text-center"
        >
          Registrarse
        </button>

        {/* Botón Conserje */}
        <button
          onClick={handleConserjeClick} // Llama a la función placeholder
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px] text-center"
        >
          Conserje
        </button>

      </div>
    </div>
  );
}