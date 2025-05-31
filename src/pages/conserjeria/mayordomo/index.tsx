import React from "react";
import Head from "next/head";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainNochero } from "../../../components/BotoneraMainNochero";
import { Footer } from "../../../components/Footer";

export default function NocheroArea() {
  return (
    <>
      <Head>
        <title>Área Nochero – Puerto Williams</title>
      </Head>

      {/* Contenedor principal: columna en móvil, fila en desktop */}
      <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
        {/* Sidebar con menú Nochero */}
        <aside className="flex-none p-4 lg:p-6">
          <BotoneraMainNochero />
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
