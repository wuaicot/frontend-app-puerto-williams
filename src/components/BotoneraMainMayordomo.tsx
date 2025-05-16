// client/src/components/BotoneraMainMayordomo.tsx
import React from 'react';
import { useRouter } from 'next/router';

export const BotoneraMainMayordomo: React.FC = () => {
  const router = useRouter();

  const botones = [
    {
      label: ' Registrar turno',
      route: '/conserjeria/turno'
    },
    {
      label: ' Ver registros',
      route: '/conserjeria/registros'
    },
    {
      label: ' Supervisar turnos',
      route: '/conserjeria/mayordomo/turnos'
    },
    {
      label: ' Aprobar solicitudes',
      route: '/conserjeria/mayordomo/solicitudes'
    },
    {
      label: ' Generar reportes',
      route: '/conserjeria/mayordomo/reportes'
    },
    {
      label: ' Contacto Admin',
      route: '/conserjeria/mayordomo/contacto'
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center gap-6 p-8 cursor-auto">
      <h1 className="text-2xl font-semibold mb-4 cursor-auto">MAYORDOMO</h1>
      <div className="flex flex-col w-full max-w-xs gap-4">
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full py-2 rounded-full border border-sky-500 text-center hover:bg-white hover:text-black transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => router.push('/')}
        className="mt-1 text-3xl animate-pulse hover:opacity-70 cursor-pointer"
      >
        ← Volver al inicio
      </button>
    </div>
  );
};
