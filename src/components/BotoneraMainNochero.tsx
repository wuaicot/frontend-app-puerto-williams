//client/src/components/BotoneraMainNochero.tsx
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const BotoneraMainNochero: React.FC = () => {
  const router = useRouter();
  const botones = [
    { label: "Registrar inicio/fin turno", route: "/conserjeria/turno" },
    { label: "Tareas asignadas", route: "/conserjeria/tareas" },
    { label: "Controlar acceso", route: "/conserjeria/acceso" },
    { label: "Atención residente", route: "/conserjeria/atencion" },
    { label: "Ver registros", route: "/conserjeria/registros" },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 text-white rounded-lg shadow-lg w-full mt-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6 lg:mb-8">
        NOCHERO
      </h1>
      <div className="flex flex-col gap-3 w-full max-w-sm p-4 rounded-2xl
        bg-gradient-to-r from-sky-500/50 to-sky-700/50 shadow-lg
        md:flex-row md:flex-wrap md:justify-center md:gap-4 lg:gap-6"
      >
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full md:w-auto py-2 px-4 rounded-full border border-sky-500 text-center hover:bg-white hover:text-black transition
              duration-300 ease-in-out text-sm md:text-base"
          >
            {btn.label}
          </button>
        ))}
      </div>
      <Link
        href="/"
        className="absolute bottom-4 left-4 text-xl hover:opacity-70 cursor-pointer animate-pulse md:bottom-6 md:left-6 lg:text-2xl"
      >
        ←
      </Link>
    </div>
  );
};