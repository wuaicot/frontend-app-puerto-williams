// client/src/pages/conserjeria/piscina.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { TurnStatus } from '../../../components/TurnStatus';

export default function PiscinaArea() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <button onClick={() => router.back()} className="text-3xl mb-4">
        ←
        </button>
      <h1 className="text-2xl mb-6">Área Piscina</h1>
      <TurnStatus />
      <p>Control de mantenimiento y prevención de la estructura del edificio.</p>
    </div>
  );
}