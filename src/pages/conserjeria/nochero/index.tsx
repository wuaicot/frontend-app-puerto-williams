// client/src/pages/conserjeria/nochero.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { TurnStatus } from '../../../components/TurnStatus';

export default function NocheroArea() {
  const router = useRouter();

  return (
    <div className="min-h-screen   bg-black text-white p-8">
      
      <h1 className="text-2xl mb-6">Área Nochero</h1>
      <TurnStatus />
      <p>Panel de control para el turno nocturno: supervisión y reportes.</p>
      <button onClick={() => router.back()} className="text-3xl mb-4"> 
        ←
      </button>
    </div>
    
  );
  
}