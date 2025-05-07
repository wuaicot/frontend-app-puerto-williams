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

export default function LandingPage() {
  const router = useRouter();

  const handleAuthAction = async (type: "register" | "login") => {
    await signOut(auth);
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
          : router.push("/conserjeria/conserje");
      } else {
        if (userData.role === "ADMIN" && userData.status === "APPROVED") {
          router.push("/admin/mainView");
        } else {
          alert("No tienes permisos para acceder como Administrador.");
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
      alert(error.response?.data?.message || `Ocurrió un error durante ${type}.`);
    }
  };

  const handleConserjeriaClick = async () => {
    await signOut(auth);
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
      } else if (data.status === "APPROVED") {
        router.push(`/conserjeria/${data.role.toLowerCase()}`);
      } else {
        alert("Acceso denegado. Solicitud rechazada.");
      }
    } catch (error: any) {
      if (
        error.code === AuthErrorCodes.POPUP_BLOCKED ||
        error.code === AuthErrorCodes.OPERATION_NOT_SUPPORTED
      ) {
        return doRedirect();
      }
      console.error("Error en login Conserjería:", error);
      alert(error.response?.data?.message || "Error durante el login de Conserjería.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="absolute top-16 text-xl">Puerto Williams App</h1>
      <div className="flex flex-col mt-8 gap-6">
        <button
          onClick={() => handleAuthAction("login")}
          className="bg-white text-black font-semibold py-2 px-10 rounded-md cursor-pointer border border-blue-700" 
        >
          Admin.
        </button>
        <button
          onClick={() => handleAuthAction("register")}
          className="bg-black text-white border border-violet-700 py-2 px-8 cursor-pointer rounded-md"
        >
          Solicitar acceso
        </button>
        <button
          onClick={handleConserjeriaClick}
          className="bg-white text-black font-semibold py-2 px-10 rounded-md cursor-pointer border border-green-700"
        >
          Conserjería
        </button>
      </div>
    </div>
  );
}
