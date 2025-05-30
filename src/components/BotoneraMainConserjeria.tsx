//client/src/components/BotoneraMainConserjeria.tsx
import React from "react";
import { useRouter } from "next/router";

export const BotoneraMainConserjeria: React.FC = () => {
  const router = useRouter();
  const botones = [
    { label: "Registrar inicio/fin turno", route: "/conserjeria/turno" },
    { label: "Tareas asignadas",        route: "/conserjeria/tareas" },
    { label: "Controlar acceso",         route: "/conserjeria/acceso" },
    { label: "Atención residente",      route: "/conserjeria/atencion" },
    { label: "Ver registros",           route: "/conserjeria/registros" },
  ];

  return (
    <nav
      className="
        w-full flex flex-col items-center justify-start gap-6
        bg-gray-800 text-white p-6 rounded-b-3xl   /* redondeo abajo en desktop */
        md:rounded-none landscape:py-8
        lg:h-full lg:w-64 lg:rounded-r-3xl lg:p-8
        lg:flex-col lg:gap-8 overflow-auto
      "
    >
      <h2 className="text-2xl font-bold mb-4 lg:mb-8">
        Panel Conserje
      </h2>

      <ul className="w-full flex flex-col gap-3 md:gap-4 lg:gap-6">
        {botones.map((btn) => (
          <li key={btn.route} className="w-full">
            <button
              onClick={() => router.push(btn.route)}
              className="
                block w-full text-center
                py-2 px-4 text-sm md:text-base font-medium
                rounded-full border-2 border-sky-500
                hover:bg-sky-500 hover:text-black
                transition
              "
            >
              {btn.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
