// client/src/components/BotoneraMainAdmin.tsx
import React from 'react';
import Link from 'next/link';

interface BotoneraMainAdminProps {
  onNavigate: (route: string) => void;
}

export const BotoneraMainAdmin: React.FC<BotoneraMainAdminProps> = ({ onNavigate }) => {
  const botones = [
    { label: 'Gestión usuarios conserjería', route: '/admin/usuarios' },
    { label: 'Ver libro de registro', route: '/admin/incidencias' },
    { label: 'Gestionar finanzas', route: '/admin/finanzas' },
    { label: 'Gestionar mantenimiento', route: '/admin/mantenimiento' },
    { label: 'Gestionar comunicación', route: '/admin/comunicacion' },
    { label: 'Gestionar normativas', route: '/admin/normativas' },
  ];

  return (
    <div className="relative flex flex-col items-center gap-4 mt-4 text-white bg-black p-4 rounded-2xl border border-violet-500 animate-pulse-slow -mb-8 
    before:content-[''] before:absolute before:-top-2 before:-left-2 before:w-full before:h-full before:bg-violet-500 before:rounded-2xl before:-z-10">
      
      
      <Link href="/" className="relative translate-y-118 text-3xl hover:opacity-70 cursor-pointer  animate-pulse-slow">
        ←
      </Link>

      <h1 className="mb-8 text-2xl font-semibold">CONSOLA ADMINISTRADOR</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs  p-4 rounded-2xl animate-pulse-slow before:content-[''] before:absolute before:-top-2 before:-left-2 before:w-full before:h-full before:bg-violet-500 before:rounded-2xl before:-z-10">
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