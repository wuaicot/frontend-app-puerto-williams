// client/src/components/TurnStatus.tsx
import React, { useState } from 'react';

export const TurnStatus: React.FC = () => {
  const [status, setStatus] = useState<'IN' | 'OUT'>('IN');

  return (
    <div className="mt-8 p-2 border-solid bg-blue-950 rounded-lg max-w-md text-white">
      <h2 className="text-center mb-2">Estado de turno actual</h2>
      <div className="flex justify-around">
        {['IN', 'OUT'].map((type) => (
          <label key={type} className="flex flex-col items-center">
            <input
              type="radio"
              name="turnStatus"
              value={type}
              checked={status === type}
              onChange={() => setStatus(type as 'IN' | 'OUT')}
              className="mb-2"
              disabled={type === 'OUT'}
            />
            {type === 'IN' ? 'Inicio' : 'Fin'}
          </label>
        ))}
      </div>
    </div>
  );
};