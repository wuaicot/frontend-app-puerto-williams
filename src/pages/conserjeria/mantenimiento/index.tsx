// client/src/pages/conserjeria/mantenimiento.tsx

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainMantenimiento } from "../../../components/BotoneraMainMantenimiento";
import { Footer } from "../../../components/Footer";

export default function MantenArea() {
  const router = useRouter();

  useEffect(() => {
    // Cada vez que el usuario pulse “Atrás” en el navegador,
    // interceptamos y redirigimos siempre a “/”:
    const onPopState = () => {
      router.replace("/");
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [router]);

  return (
    <div className="relative bg-black text-white p-8 min-h-screen">
      {/* Botón manual “←” que lleva siempre a "/" */}
      <button
        onClick={() => router.replace("/")}
        className="absolute top-4 left-4 text-3xl text-white hover:text-gray-400 transition duration-300"
        aria-label="Volver a inicio"
      >
        ←
      </button>

      <div className="mt-12 text-center">
        <p className="text-lg mb-4">
          Control de mantenimiento y prevención del edificio.
        </p>
        <BotoneraMainMantenimiento />
      </div>

      <section className="mt-8 p-4 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <TurnStatus />
        <Footer />
      </section>
    </div>
  );
}
