//client/src/components/BotoneraMainNochero.tsx
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const BotoneraMainNochero: React.FC = () => {
  const router = useRouter();
  const botones = [
    { label: "Registrar inicio turno", route: "/conserjeria/turno" },
    { label: "Tareas asignadas", route: "/conserjeria/tareas" },
    { label: "Controlar acceso", route: "/conserjeria/acceso" },
    { label: "Atención residente", route: "/conserjeria/atencion" },
    { label: "Ver registros", route: "/conserjeria/registros" },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 text-white 
     rounded-lg shadow-lg w-full">
      <h1 className="mb-6  mt-12 text-2xl font-semibold ">NOCHERO</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs 
      bg-gradient-to-r from-sky-500/50 to-sky-700/50 p-4 rounded-4xl shadow-lg">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full cursor-pointer py-2 px-6 rounded-full border border-sky-500 text-center hover:bg-white hover:text-black transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
      <Link
        href="/"
        className="mt-2 animate-pulse  text-3xl hover:opacity-70 flex flex-col items-center justify-center w-full"
      >
        ←
      </Link>
    </div>
  );
};
