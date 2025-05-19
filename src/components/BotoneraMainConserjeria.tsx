//client/src/components/BotoneraMainConserjeria.tsx
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
export const BotoneraMainConserjeria: React.FC = () => {
  const router = useRouter();
  const botones = [
    { label: "Registrar inicio/fin turno", route: "/conserjeria/turno" },
    { label: "Tareas asignadas", route: "/conserjeria/tareas" },
    { label: "Controlar acceso", route: "/conserjeria/acceso" },
    { label: "Atención residente", route: "/conserjeria/atencion" },
    { label: "Ver registros", route: "/conserjeria/registros" },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 text-white">
      <h1 className="mb-2 mt-4 text-2xl font-semibold">Panel del Conserje</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full cursor-pointer py-2 px-16 rounded-full border border-sky-500 text-center hover:bg-white hover:text-black transition 
            duration-300 ease-in-out shadow-lg text-white font-semibold 
            "
          >
            {btn.label}
          </button>
        ))}
      </div>
      <Link
        href="/"
        className="mt-8 animate-pulse  text-3xl hover:opacity-70 flex flex-col items-center justify-center w-full"
      >
        ←
      </Link>
    </div>
  );
};
