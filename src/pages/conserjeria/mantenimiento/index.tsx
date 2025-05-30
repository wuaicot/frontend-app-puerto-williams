// client/src/pages/conserjeria/mantenimiento.tsx
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainMantenimiento } from "../../../components/BotoneraMainMantenimiento";
import { Footer } from "../../../components/Footer";

export default function MantenimientoArea() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Panel Mantenimiento - Puerto Williams</title>
      </Head>
      <div className="relative flex min-h-screen flex-col bg-black text-white">
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

        {/* Layout: columna móvil, fila desktop */}
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Sidebar con botones */}
          <aside className="w-full lg:w-64 p-4">
            <BotoneraMainMantenimiento />
          </aside>

          {/* Contenido principal */}
          <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 gap-8">
            <p className="text-center text-lg">
              Control de mantenimiento y prevención del edificio.
            </p>
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
