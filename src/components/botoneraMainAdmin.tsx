// client/src/components/BotoneraMainAdmin.tsx
import React from 'react';
import Link from 'next/link';

interface BotoneraMainAdminProps {
  onNavigate: (route: string) => void;
}

export const BotoneraMainAdmin: React.FC<BotoneraMainAdminProps> = ({ onNavigate }) => {
  const botones = [
    { label: 'Gestión usuario Conserje', route: '/admin/usuarios' },
    { label: 'Ver reporte incidencia', route: '/admin/incidencias' },
    { label: 'Gestionar finanzas', route: '/admin/finanzas' },
    { label: 'Gestionar mantenimiento', route: '/admin/mantenimiento' },
    { label: 'Gestionar comunicación', route: '/admin/comunicacion' },
    { label: 'Gestionar normativas', route: '/admin/normativas' },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 text-white">
      {/* Flecha de back: ahora Link sin <a> interno */}
      <Link href="/" className="absolute top-4 left-4 text-3xl hover:opacity-70">
        ←
      </Link>

      <h1 className="mb-8 text-2xl font-semibold">CONSOLA ADMINISTRADOR</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => onNavigate(btn.route)}
            className="w-full py-2 px-4 rounded-full border border-white text-center hover:bg-white hover:text-black transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
