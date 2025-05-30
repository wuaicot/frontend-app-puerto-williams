// client/src/components/BotoneraMainMantenimiento.tsx
import React from "react";
import { useRouter } from "next/router";

export const BotoneraMainMantenimiento: React.FC = () => {
  const router = useRouter();
  const botones = [   
    { label: "Ver registros", route: "/conserjeria/registros" },     
    { label: "Control de pisos", route: "/conserjeria/pisos" },
    { label: "Control de muros", route: "/conserjeria/muros" },
    { label: "Tareas asignadas", route: "/conserjeria/tareas" },    
    { label: "Registrar inicio/fin turno", route: "/conserjeria/turno" },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 mt-6 text-white bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h1 className="text-xl sm:text-2xl font-semibold text-center text-slate-300">
        Panel de Mantenimiento
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-sm
                      md:flex-row md:flex-wrap md:justify-center md:gap-6">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full md:w-auto py-2 px-4 rounded-full border border-sky-500
                       bg-sky-500 text-white font-semibold text-sm md:text-base
                       hover:bg-white hover:text-black transition transform hover:scale-105"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
