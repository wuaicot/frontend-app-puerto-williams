// client/src/components/BotoneraMainAdmin.tsx
import React from "react";
import Link from "next/link";

interface BotoneraMainAdminProps {
  onNavigate: (route: string) => void;
}

export const BotoneraMainAdmin: React.FC<BotoneraMainAdminProps> = ({
  onNavigate,
}) => {
  const botones = [
    { label: "Gestión usuarios conserjería", route: "/admin/usuarios" },
    { label: "Ver libro de registro", route: "/admin/incidencias" },
    { label: "Gestionar finanzas", route: "/admin/finanzas" },
    { label: "Gestionar mantenimiento", route: "/admin/mantenimiento" },
    { label: "Gestionar comunicación", route: "/admin/comunicacion" },
    { label: "Gestionar normativas", route: "/admin/normativas" },
  ];

  return (
    <div
      className="relative flex flex-col items-center gap-6 mt-6 text-white bg-black p-6 rounded-2xl border border-violet-500 animate-pulse-slow mb-8 sm:mb-0
      before:content-[''] before:absolute before:-top-2 before:-left-2 before:w-full before:h-full before:bg-violet-500 before:rounded-2xl before:-z-10 md:gap-8"
    >
      <Link
        href="/"
        className="absolute top-4 left-4 text-xl hover:opacity-70 cursor-pointer animate-pulse-slow md:top-6 md:left-6 lg:text-2xl"
      >
        ←
      </Link>

      <h1 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6 lg:mb-8">
        CONSOLA ADMINISTRADOR
      </h1>

      <div className="flex flex-col gap-3 w-full max-w-sm p-4 rounded-2xl animate-pulse-slow
        before:content-[''] before:absolute before:-top-2 before:-left-2 before:w-full before:h-full before:bg-violet-500 before:rounded-2xl before:-z-10
        md:flex-row md:flex-wrap md:justify-center md:gap-4 lg:gap-6"
      >
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => onNavigate(btn.route)}
            className="w-full md:w-auto py-2 px-4 rounded-full border border-white text-center hover:bg-white hover:text-black transition cursor-pointer text-sm md:text-base"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};