import React from "react";
import { useRouter } from "next/router";

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
    <div
      className="
        bg-gradient-to-r from-sky-600/50 to-sky-800/50 
        text-white flex flex-col 
        w-full max-w-sm 
        p-6 rounded-2xl shadow-lg
        transition-all duration-300 ease-in-out
        lg:sticky lg:top-4 lg:max-w-xs
      "
    >
      {/* Título */}
      <h1 className="text-2xl font-semibold text-center mb-6">
        NOCHERO
      </h1>

      {/* Botones */}
      <div className="flex flex-col gap-4">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="
              w-full py-2 px-4 
              bg-sky-500/80 text-white font-medium
              rounded-full border border-transparent
              text-sm md:text-base 
              hover:bg-white hover:text-black
              transition-transform transform hover:scale-105
              shadow-md
            "
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Eliminar cualquier <Link> de “volver” de aquí */}
      {/* La flecha “←” ahora irá en la página principal */}
    </div>
  );
};
