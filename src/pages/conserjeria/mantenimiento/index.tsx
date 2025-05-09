// client/src/pages/conserjeria/piscina.tsx

import React from 'react';
import { useRouter } from 'next/router';
import { TurnStatus } from '../../../components/TurnStatus';
import { BotoneraMainMantenimiento } from '../../../components/BotoneraMainMantenimiento';

export default function PiscinaArea() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <button onClick={() => router.back()} className="text-3xl mb-4">
        ←
        </button>
      {/* <h1 className="text-2xl mb-6">Área MANTENIMIENTO</h1> */}
      <p className="text-lg mb-4 content ">Control de mantenimiento y prevención del edificio.</p>
      <BotoneraMainMantenimiento />
      <section className="-mt-3">
        <TurnStatus />
      </section>
      
    </div>
  );
}