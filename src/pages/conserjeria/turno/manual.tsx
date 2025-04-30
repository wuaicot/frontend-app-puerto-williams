// client/src/pages/conserjeria/turno/manual.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TurnStatus } from '../../../components/TurnStatus';

export default function ManualTurnRegistration() {
  const router = useRouter();
  const [entry, setEntry] = useState('');

  const handleSubmit = () => {
    // TODO: send to backend
    console.log('Manual entry:', entry);
    router.back();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-8 text-white">
      <button onClick={() => router.back()} className="absolute top-4 left-4 text-3xl hover:opacity-70">←</button>
      <h1 className="mt-8 mb-6 text-2xl font-semibold">Registro Manual de Turno</h1>
      <TurnStatus />
      <textarea
        className="w-full max-w-md h-40 p-2 mt-4 bg-gray-900 text-white rounded"
        placeholder="Escribe aquí los detalles de inicio/fin de turno..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 py-2 px-6 bg-white text-black rounded hover:bg-gray-200"
      >
        Guardar Registro
      </button>
    </div>
  );
}