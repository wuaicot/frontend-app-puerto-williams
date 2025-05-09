// client/src/pages/conserjeria/nochero.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { TurnStatus } from '../../../components/TurnStatus';
import { BotoneraMainNochero } from '../../../components/BotoneraMainNochero';

export default function NocheroArea() {
  const router = useRouter();

  return (
    <div className="min-h-screen   bg-black text-white p-8">
      
     
      <p>Panel de control para el turno nocturno: supervisión de camaras y rondas.</p>
      <div className='-mt-8'>
        <BotoneraMainNochero />
      </div>

      <div className="-mt-12">
        <TurnStatus /> 
      </div>     
     
    </div>
    
  );
  
}