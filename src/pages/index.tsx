// client/src/pages/index.tsx
import React from "react";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  AuthErrorCodes,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import apiClient from "../lib/axios";
import { RiAdminLine, RiUserAddLine, RiBuilding2Line, RiLoginBoxLine } from "react-icons/ri"; // Iconos de ejemplo

export default function LandingPage() {
  const router = useRouter();

  // La lógica de handleAuthAction y handleConserjeriaClick permanece igual
  // ya que el enfoque es en la estilización.
  // Se han realizado pequeñas adaptaciones en los mensajes de alerta para consistencia.

  const handleAuthAction = async (type: "register" | "login") => {
    await signOut(auth).catch(console.warn); // Es buena práctica manejar el error de signOut también
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const doRedirect = () => signInWithRedirect(auth, provider);

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      const endpoint = type === "register" ? "/auth/register" : "/auth/login";
      const { data: userData } = await apiClient.post(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      if (type === "register") {
        userData.status === "PENDING"
          ? router.push("/pendiente-aprobacion")
          // Considerar una ruta genérica o dashboard si ya está aprobado desde el registro
          : router.push(`/conserjeria/${userData.role?.toLowerCase() || 'conserje'}`);
      } else { // type === "login" (Admin login)
        if (userData.role === "ADMIN" && userData.status === "APPROVED") {
          router.push("/admin/mainView");
        } else {
          // Idealmente, esto sería un componente de notificación más elegante
          alert("Acceso denegado. Solo administradores autorizados.");
        }
      }
    } catch (error: any) {
      if (
        error.code === AuthErrorCodes.POPUP_BLOCKED ||
        error.code === AuthErrorCodes.OPERATION_NOT_SUPPORTED
      ) {
        return doRedirect();
      }
      console.error(`Error en ${type}:`, error);
      alert(error.response?.data?.message || `Ocurrió un error durante la acción de ${type}.`);
    }
  };

  const handleConserjeriaClick = async () => {
    await signOut(auth).catch(console.warn);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const doRedirect = () => signInWithRedirect(auth, provider);

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      const { data } = await apiClient.get<{
        status: "PENDING" | "APPROVED" | "REJECTED";
        role: string;
      }>("/auth/status", {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (data.status === "PENDING") {
        router.push("/pendiente-aprobacion");
      } else if (data.status === "APPROVED" && data.role) {
        router.push(`/conserjeria/${data.role.toLowerCase()}`);
      } else {
         // Si está aprobado pero no tiene rol, o si está rechazado
        alert(data.status === "REJECTED" ? "Acceso denegado. Tu solicitud ha sido rechazada." : "Tu cuenta está aprobada pero no tienes un rol asignado. Contacta al administrador.");
      }
    } catch (error: any) {
      if (
        error.code === AuthErrorCodes.POPUP_BLOCKED ||
        error.code === AuthErrorCodes.OPERATION_NOT_SUPPORTED
      ) {
        return doRedirect();
      }
      console.error("Error en login Conserjería:", error);
      alert(error.response?.data?.message || "Error durante el inicio de sesión de Conserjería.");
    }
  };

  // Clases base para los botones para mantener consistencia y facilitar cambios
   const baseButtonStyles = "flex items-center justify-center w-full max-w-xs px-6 py-3 text-lg font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ease-in-out";
  // const primaryButtonStyles = `${baseButtonStyles} bg-cyan-300 rounded-xl hover:bg-cyan-500 text-black focus:ring-cyan-400`;
  // const secondaryButtonStyles = `${baseButtonStyles} bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500`;
  // Si se quiere un botón "outline" para solicitar acceso:
   const outlineButtonStyles = `${baseButtonStyles} text-cyan-400 border-2 border-cyan-500 hover:bg-cyan-500 hover:text-white focus:ring-cyan-400`;


  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-12 sm:p-8">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
          <span className="bg-cyan-400 text-black rounded">P</span>uerto <span className="bg-cyan-400 text-black rounded">W</span>illiams<span className="text-cyan-400">App</span>
        </h1>
        <p className="mt-4 text-lg sm:text-md text-gray-300">
          Herramienta Organizativa para su Comunidad.
        </p>
      </div>

      <div className="flex  flex-col items-center gap-6 w-full">
        <button
          onClick={() => handleAuthAction("login")}
          className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-200 ease-in-out px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <RiAdminLine className="mr-3 text-2xl" />
          Admin.
        </button>
        <button
          onClick={handleConserjeriaClick} // Botón unificado para conserjes existentes
          className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-200 ease-in-out px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <RiLoginBoxLine className="mr-3 text-2xl" />
          Conserjería
        </button>
        <button
          onClick={() => handleAuthAction("register")}
          className={outlineButtonStyles} // O usar outlineButtonStyles si se quiere diferenciar más
        >
          <RiUserAddLine className=" mr-3 text-2xl " />
          <span className="text-white">Solicitar Acceso</span>
        </button>
      </div>

      <footer className="absolute bottom-12 text-center w-full text-gray-400 text-sm ">
        <div className="flex items-center justify-center animate-pulse">
          <p>&copy; {new Date().getFullYear()} Puerto Williams App. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}