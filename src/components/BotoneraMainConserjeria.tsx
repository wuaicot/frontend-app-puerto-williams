//client/src/components/BotoneraMainConserjeria.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
export const BotoneraMainConserjeria: React.FC = () => {
  const router = useRouter();
  const botones = [
    { label: 'Registrar inicio turno', route: '/conserjeria/turno' },
    { label: 'Tareas asignadas', route: '/conserjeria/tareas' },
    { label: 'Controlar acceso', route: '/conserjeria/acceso' },
    { label: 'Atención residente', route: '/conserjeria/atencion' },
    { label: 'Ver registros', route: '/conserjeria/registros' },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 text-white">
     <Link href="/" className="relative translate-y-112 text-3xl hover:opacity-70">
        ←
      </Link>
      <h1 className="mb-6 text-2xl font-semibold">CONSERJE</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full cursor-pointer py-2 px-6 rounded-full border border-white text-center hover:bg-white hover:text-black transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
