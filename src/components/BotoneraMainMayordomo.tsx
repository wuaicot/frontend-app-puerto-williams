import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const BotoneraMainMayordomo: React.FC = () => {
  const router = useRouter();

  const botones = [
    {
      label: " Ver Libro de Registros",
      route: "/conserjeria/mayordomo/registros",
    },
    { label: " Supervisar Turnos", route: "/conserjeria/mayordomo/turnos" },
    {
      label: " Aprobar Solicitudes",
      route: "/conserjeria/mayordomo/solicitudes",
    },
    { label: " Generar Reportes", route: "/conserjeria/mayordomo/reportes" },
    { label: " Contacto Admin", route: "/conserjeria/mayordomo/contacto" },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 text-white bg-black min-h-screen">
      <h1 className="mb-6 -mt-4 text-2xl font-semibold">MAYORDOMO</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
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
        className=" animate-pulse text-3xl hover:opacity-70 flex items-center justify-center w-full"
      >
        ←
      </Link>
    </div>
  );
};
