// client/src/components/BotoneraMainConserjeria.tsx
import React from 'react';
import { useRouter } from 'next/router';

export const BotoneraMainConserjeria: React.FC = () => {
  const router = useRouter();
  const botones = [
    { label: 'Registrar inicio/fin turno', route: '/conserjeria/turno' },
    { label: 'Tareas asignadas', route: '/conserjeria/tareas' },
    { label: 'Controlar acceso', route: '/conserjeria/acceso' },
    { label: 'Atención residente', route: '/conserjeria/atencion' },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 text-white">
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 text-3xl hover:opacity-70"
      >
        ←
      </button>

      <h1 className="mb-6 text-2xl font-semibold">CONSERJERIA</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full py-2 px-6 rounded-full border border-white text-center hover:bg-white hover:text-black transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};