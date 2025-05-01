// client/src/pages/conserjeria/conserje/index.tsx
import React from "react";
// import { useRouter } from "next/router"; // No usado actualmente
import { TurnStatus } from "../../../components/TurnStatus"; // Ajusta ruta si es necesario
import { BotoneraMainConserjeria } from "../../../components/BotoneraMainConserjeria"; // Ajusta ruta si es necesario
import Head from 'next/head'; // Para el título de la página

// Componente funcional principal para el área del conserje
export default function ConserjeArea() {
  // const router = useRouter(); // Mantener si se necesita en el futuro

  return (
    <>
      <Head>
        <title>Panel Conserje - Puerto Williams</title> {/* Título útil para el navegador */}
      </Head>
      <div className="flex min-h-screen flex-col items-center bg-gray-900 p-4 sm:p-8 text-white">
        {/* Contenedor principal con padding y centrado */}
        <div className="w-full max-w-md"> {/* Limita el ancho en pantallas grandes */}
          <h1 className="mb-6 text-center text-2xl font-bold text-cyan-400">
            Panel de Conserje
          </h1>
          
          {/* Componente con los botones de acción */}
          <BotoneraMainConserjeria />

          {/* Separador visual */}
          <hr className="my-6 border-gray-700" />

          {/* Componente que muestra el estado del turno */}
          <TurnStatus />
        </div>
      </div>
    </>
  );
}