// client/src/components/BotoneraMainMantenimiento.tsx

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const BotoneraMainMantenimiento: React.FC = () => {
  const router = useRouter();
  const botones = [
    { label: "Registrar inicio turno", route: "/conserjeria/turno" },
    { label: "Tareas asignadas", route: "/conserjeria/tareas" },
    { label: "Control de pisos", route: "/conserjeria/pisos" },
    { label: "Control de muros", route: "/conserjeria/muros" },
    { label: "Ver registros", route: "/conserjeria/registros" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-auto gap-6 text-white 
    ">
      <h1 className="text-xl font-semibold text-center mt-8 mb-4 
      text-slate-300">
        
        Panel de control Mantenimiento
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto 
      ">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full cursor-pointer px-4 rounded-full border border-sky-500 text-center hover:bg-white hover:text-black transition 
            duration-300 ease-in-out shadow-lg bg-sky-500 text-white font-semibold text-lg transform hover:scale-104"
            
          >
            {btn.label}
          </button>
        ))}
      </div>

      <Link
        href="/"
        className="mt-1 animate-pulse text-3xl hover:opacity-70"
      >
        ←
      </Link>
    </div>
  );
};