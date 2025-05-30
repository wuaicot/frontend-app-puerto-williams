// client/src/pages/conserjeria/conserje/index.tsx
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainConserjeria } from "../../../components/BotoneraMainConserjeria";
import { Footer } from "../../../components/Footer";

export default function ConserjeArea() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Panel Conserje - Puerto Williams</title>
      </Head>
      <div className="relative flex min-h-screen flex-col bg-gray-900 text-white">
        {/* Botón volver */}
        <button
          onClick={() => router.back()}
          className="
            absolute top-4 left-4 z-10 text-2xl
            text-white bg-gray-800/50 p-2 rounded-full
            hover:bg-gray-700 transition
          "
          aria-label="Volver"
        >
          ←
        </button>

        {/* Contenedor principal: columna en móvil, fila en desktop */}
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-64">
            <BotoneraMainConserjeria />
          </div>

          {/* Contenido */}
          <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 gap-8">
            <div className="w-full max-w-md">
              <TurnStatus />
            </div>
            <div className="w-full max-w-lg">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
