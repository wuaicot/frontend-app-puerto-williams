// client/src/components/BotoneraMainAdmin.tsx
import React from 'react';
import Link from 'next/link';

interface BotoneraMainAdminProps {
  onNavigate: (route: string) => void;
}

export const BotoneraMainAdmin: React.FC<BotoneraMainAdminProps> = ({ onNavigate }) => {
  const botones = [
    { label: 'Gestión usuario Conserjería', route: '/admin/usuarios' },
    { label: 'Ver libro de registro', route: '/admin/incidencias' },
    { label: 'Gestionar finanzas', route: '/admin/finanzas' },
    { label: 'Gestionar mantenimiento', route: '/admin/mantenimiento' },
    { label: 'Gestionar comunicación', route: '/admin/comunicacion' },
    { label: 'Gestionar normativas', route: '/admin/normativas' },
  ];

  return (
    <div className="relative flex flex-col items-center gap-4 -mt-16 text-white">
      
      <Link href="/" className="relative translate-y-112 text-3xl hover:opacity-70   ">
        ←
      </Link>

      <h1 className="mb-8 text-2xl font-semibold">CONSOLA ADMINISTRADOR</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => onNavigate(btn.route)}
            className="w-auto py-1  rounded-full border border-white text-center hover:bg-white hover:text-black transition cursor-pointer "
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};