import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Footer } from "./Footer";

export const BotoneraMainMayordomo: React.FC = () => {
  const router = useRouter();

  const botones = [
    {
      label: "Registrar Inicio/Fin turno",
      route: "/conserjeria/turno",
    },
    {
      label: "Ver registros",
      route: "/conserjeria/registros",
    },
    {
      label: "Supervisar turnos",
      route: "/conserjeria/mayordomo/turnos",
    },
    // {
    //   label: "Aprobar solicitudes",
    //   route: "/conserjeria/mayordomo/solicitudes",
    // },
    {
      label: "Generar reportes",
      route: "/conserjeria/mayordomo/reportes",
    },
    {
      label: "Contacto Admin",
      route: "/conserjeria/mayordomo/contacto",
    },
  ];

  return (
    <div
      className="
        bg-gray-800 text-white flex flex-col
        w-full max-w-sm 
        px-6 py-8 rounded-2xl shadow-lg
        transition-all duration-300 ease-in-out
        
        lg:sticky lg:top-4 lg:max-w-xs
      "
    >
      {/* Título */}
      <h1 className="text-2xl font-semibold text-center mb-6">
        MAYORDOMO
      </h1>

      {/* Botones */}
      <div className="flex flex-col gap-4">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="
              w-full py-2 px-4 
              bg-sky-500 text-white font-medium
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

      {/* Espaciador flexible para empujar el Footer al fondo */}
      <div className="mt-auto" />

      {/* Footer fijo en la parte inferior */}
      <div className="pt-6">
        <Footer />
      </div>

      {/* Botón “←” */}
      <Link
        href="/"
        aria-label="Volver"
        className="
          absolute bottom-4 left-4 
          bg-gray-700/75 text-white 
          p-2 rounded-full
          hover:bg-gray-600 transition
        "
      >
        ←
      </Link>
    </div>
  );
};
