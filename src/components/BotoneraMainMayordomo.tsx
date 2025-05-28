// client/src/components/BotoneraMainMayordomo.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Footer } from './Footer';

export const BotoneraMainMayordomo: React.FC = () => {
  const router = useRouter();

  const botones = [
    {
      label: ' Registrar Inicio/Fin turno',
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
    // {
    //   label: ' Aprobar solicitudes',
    //   route: '/conserjeria/mayordomo/solicitudes'
    // },
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
    <div className="relative bg-black text-white min-h-screen flex flex-col items-center gap-6 p-6 sm:p-8 lg:p-12 cursor-auto">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6 lg:mb-8 cursor-auto">MAYORDOMO</h1>
      <div className="flex flex-col gap-3 w-full max-w-sm p-4 rounded-2xl
        md:flex-row md:flex-wrap md:justify-center md:gap-4 lg:gap-6"
      >
        {botones.map((btn) => (
          <button
            key={btn.route}
            onClick={() => router.push(btn.route)}
            className="w-full md:w-auto py-2 px-4 rounded-full border border-sky-500 text-center hover:bg-white hover:text-black transition
              duration-300 ease-in-out shadow-lg text-white font-semibold text-sm md:text-base"
          >
            {btn.label}
          </button>
        ))}
      </div>
      <Link
        href="/"
        className="absolute bottom-4 left-4 text-xl hover:opacity-70 cursor-pointer animate-pulse md:bottom-6 md:left-6 lg:text-2xl"
      >
        ←
      </Link>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};