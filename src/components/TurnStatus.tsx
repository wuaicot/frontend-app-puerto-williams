import React, { useState, useEffect } from 'react';
import apiClient from '../lib/axios';

export const TurnStatus: React.FC = () => {
  const [status, setStatus] = useState<'IN' | 'OUT' | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiClient.get<{ status: 'IN' | 'OUT' }>('/novedades/current-status');
        setStatus(res.data.status);
        if (res.data.status === 'IN') {
          const durRes = await apiClient.get<{ minutes: number }>('/novedades/current-duration');
          setDuration(durRes.data.minutes);
        }
      } catch {
        setError('No se pudo cargar el estado');
      } finally {
        setLoading(false);
      }
    };
    fetch();
    const iv = setInterval(fetch, 60000);
    return () => clearInterval(iv);
  }, []);

  if (loading) return <div className="mt-8">Cargando estado...</div>;
  if (error) return <div className="mt-8 text-red-600">{error}</div>;

  return (
    <div className="mt-8 p-4 bg-blue-950 rounded-lg max-w-md mx-auto text-white">
      <h2 className="text-center mb-2">Turno actual</h2>
      <div className="text-xl font-semibold text-center mb-2">
        {status === 'IN' ? '🔓 Inicio de turno' : '🔒 Fin de turno'}
      </div>
      {status === 'IN' && duration != null && (
        <div className="text-center text-sm">
          Llevas <strong>{duration}</strong> minuto{duration !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};
