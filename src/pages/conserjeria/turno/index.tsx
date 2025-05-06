// client/src/pages/conserjeria/turno/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { SpeakerWaveIcon, PencilIcon } from '@heroicons/react/24/outline';


export default function TurnoModeSelection() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-8 text-white">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-3xl hover:opacity-70"
      >
        ←
      </button>

      <h1 className="mt-8 mb-12 text-2xl font-semibold">Elija modo de registro</h1>

      <div className="flex flex-col items-center gap-12">
        {/* Voice mode */}
        <button
          onClick={() => router.push('/conserjeria/turno/voice')}
          className="flex flex-col items-center"
        >
          <div className="text-6xl mb-2">🗣️</div>
          <span>Con mi voz</span>
        </button>

        {/* Manual mode */}
        <button
          onClick={() => router.push('/conserjeria/turno/manual')}
          className="flex flex-col items-center"
        >
          <div className="text-6xl mb-2">📝</div>
          <span>Manualmente</span>
        </button>
      </div>
    </div>
  );
}