// client/src/components/BotoneraMainConserjeria.tsx
import React from 'react';

interface BotoneraMainConserjeriaProps {
  onNavigate: (route: string) => void;
}

export const BotoneraMainConserjeria: React.FC<BotoneraMainConserjeriaProps> = ({ onNavigate }) => {
  const botones = [
    { label: 'Control de acceso y seguridad', route: '/conserjeria/acceso' },
    { label: 'Atención y asistencia',       route: '/conserjeria/asistencia' },
    { label: 'Supervisión y reporte',      route: '/conserjeria/incidencias' },
  ];

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 text-white">
      <button
        onClick={() => onNavigate('/')}
        className="absolute top-4 left-4 text-3xl hover:opacity-70"
      >
        ←
      </button>

      <h1 className="mb-8 text-2xl font-semibold">ENTORNO CONSERJERÍA</h1>
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
