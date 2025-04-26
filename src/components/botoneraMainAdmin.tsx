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
    { label: "Gestión usuario Conserje", route: "/admin/usuarios" },
    { label: "Ver reporte incidencia", route: "/admin/incidencias" },
    { label: "Gestionar finanzas", route: "/admin/finanzas" },
    { label: "Gestionar mantenimiento", route: "/admin/mantenimiento" },
    { label: "Gestionar comunicación", route: "/admin/comunicacion" },
    { label: "Gestionar normativas", route: "/admin/normativas" },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 text-white">
  <h1 className="mb-16 -mt-20 text-2xl border font-semibold"><span className="p-4">CONSOLA ADMINISTRADOR</span></h1>

  <div className="flex flex-col gap-4 w-full max-w-xs">
    {botones.map((btn) => (
      <button
        key={btn.route}
        onClick={() => onNavigate(btn.route)}
        className="w-full py-0.5 px-4 rounded-sm border  cursor-pointer  border-blue-700 bg-white text-black text-center hover:bg-gray-300 transition"
      >
        {btn.label}
      </button>
    ))}
  </div>

  <Link href="/" className="absolute top-4 left-4 text-3xl hover:opacity-70">
    <span className="translate-y-90 absolute">←</span>
  </Link>
</div>
  );
};
