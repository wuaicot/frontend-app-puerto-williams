// client/src/pages/conserjeria/mayordomo/index.tsx
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainMayordomo } from "../../../components/BotoneraMainMayordomo";
import { Footer } from "../../../components/Footer";

export default function MayordomoArea() {
  const router = useRouter();

  useEffect(() => {
    // Interceptar el “back” del navegador para forzar ir a “/”
    router.beforePopState(() => {
      router.replace("/");
      return false; // impedimos el comportamiento normal de “volver”
    });

    return () => {
      // Restaurar el comportamiento normal cuando el componente se desmonte
      router.beforePopState(() => true);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Área Mayordomo – Puerto Williams</title>
      </Head>

      {/* Botón personalizado para volver a “/” */}
      <button
        onClick={() => router.replace("/")}
        className="
          absolute top-4 left-4 z-10 text-3xl
          text-white bg-gray-800/50 p-2 rounded-full
          hover:bg-gray-700 transition
        "
        aria-label="Volver"
      >
        ←
      </button>

      {/* Contenedor principal: columna en móvil, fila en desktop */}
      <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
        {/* Sidebar con menú Mayordomo */}
        <aside className="flex-none p-4 lg:p-6">
          <BotoneraMainMayordomo />
        </aside>

        {/* Contenido principal: TurnStatus + footer */}
        <main className="flex flex-1 flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
          {/* Estado del turno */}
          <div className="w-full max-w-md mb-8">
            <TurnStatus />
          </div>

          {/* Footer en la parte inferior del contenido */}
          <div className="w-full max-w-md">
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
