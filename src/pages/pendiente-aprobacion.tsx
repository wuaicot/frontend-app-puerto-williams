// client/src/pages/pendiente-aprobacion.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../lib/axios';

type Status = 'PENDING' | 'APPROVED' | 'REJECTED';

interface StatusResponse {
  status: Status;
  role: string;
  reason?: string;
}

export default function PendienteAprobacion() {
  const router = useRouter();
  const [info, setInfo] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // 1) Pedir estado al backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data } = await apiClient.get<StatusResponse>('/auth/status');
        setInfo(data);
      } catch (err) {
        console.error(err);
        // Si no está autenticado, lo mandamos al landing
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [router]);

  // 2) Si es APPROVED, redirige automáticamente tras 2s
  useEffect(() => {
    if (!loading && info?.status === 'APPROVED') {
      setTimeout(() => router.push('/conserjeria/mainView'), 2000);
    }
  }, [loading, info, router]);

  if (loading) {
    return <p className="p-8 text-center text-white bg-black min-h-screen">Cargando estado…</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-black p-8 
    text-center 
    bg-[url('/images/pendiente-aprobacion.jpg')] bg-cover bg-no-repeat bg-center">
      {info!.status === 'PENDING' && (
        <>
          <h1 className="text-3xl mb-4 mt-140 text-white 
          bg-black bg-opacity-50 p-4 rounded-lg 
          shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 animate-spin" viewBox="0 0 24 24">
            <circle className="fill-current text-violet-500" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="fill-current text-white"  />
          </svg>
          Solicitud en revisión</h1>
          {/* <p className="mb-6">Rol solicitado: <strong>{info!.role}</strong></p> */}
          <p className='animate-pulse border'>Por favor, espera a que el administrador apruebe tu solicitud.</p>
        </>
      )}

      {info!.status === 'REJECTED' && (
        <>
          <h1 className="text-3xl mb-4">Acceso rechazado</h1>
          <p className="mb-4">Motivo: <em>{info!.reason || 'No especificado'}</em></p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/')}
              className="py-2 px-6 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Entiendo
            </button>
            <a
              href="mailto:example@puerto-williams-app.com"
              className="py-2 px-6 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Contactar
            </a>
          </div>
        </>
      )}

      {info!.status === 'APPROVED' && (
        <>
          <h1 className="text-3xl mb-4">¡Felicidades!</h1>
          <p className="mb-6">Tu acceso ha sido aprobado. Redirigiendo…</p>
        </>
      )}
    </div>
  );
}
