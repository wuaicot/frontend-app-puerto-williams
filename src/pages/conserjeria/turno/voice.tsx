// client/src/pages/conserjeria/turno/voice.tsx
import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import apiClient from '../../../lib/axios';
import { TurnStatus } from '../../../components/TurnStatus';

export default function VoiceTurnRegistration() {
  const router = useRouter();
  const [role, setRole] = useState<string>('');
  const [isTurnOpen, setIsTurnOpen] = useState<boolean>(true);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [pendingText, setPendingText] = useState<string>('');
  const [showContinue, setShowContinue] = useState<boolean>(false);

  // Obtener rol y estado al montar
  useEffect(() => {
    apiClient
      .get<{ status: string; role: string }>('/auth/status')
      .then((res) => {
        if (res.data.status !== 'APPROVED') {
          router.replace('/pendiente-aprobacion');
        } else {
          setRole(res.data.role);
        }
      })
      .catch(() => {
        router.replace('/');
      });
  }, [router]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Tu navegador no soporta reconocimiento de voz.</p>
      </div>
    );
  }

  function startListening() {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  }

  function stopListening() {
    SpeechRecognition.stopListening();
    setPendingText(transcript);
    setIsReviewOpen(true);
  }

  async function handleSend(isLast: boolean) {
    try {
      // <-- OJO aquí: sin '/api' extra
      await apiClient.post('/api/novedades', {
        description: pendingText,
        entryMethod: 'VOICE',
        isLast,
      });
      setIsReviewOpen(false);
      setIsTurnOpen(!isLast);
      setShowContinue(true);
    } catch (err) {
      console.error('Error guardando registro:', err);
      alert('No se pudo guardar el registro.');
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      {/* Botón volver */}
      <button
        onClick={() => router.back()}
        aria-label="Volver"
        title="Volver"
        className="absolute top-4 left-4 text-3xl hover:opacity-70"
      >
        ←
      </button>

      <h1 className="mt-4 text-2xl font-semibold text-center">Registro por Voz</h1>
      <TurnStatus />

      <div className="flex flex-col items-center justify-center mt-12">
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
          aria-label="Mantén pulsado para grabar"
          className="relative p-6 bg-red-600 rounded-full"
        >
          <span className="absolute inset-0 rounded-full bg-red-600 opacity-50 animate-ping" />
          <SpeakerWaveIcon className="relative w-16 h-16 text-white" />
        </button>
        <p className="mt-4">
          {listening ? 'Escuchando...' : 'Mantén presionado para grabar'}
        </p>
      </div>

      {/* Modal de revisión */}
      <Transition appear show={isReviewOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsReviewOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Revisión de Registro
                  </Dialog.Title>
                  <div className="mt-2 text-left">
                    <p className="text-sm text-gray-700">Texto transcrito:</p>
                    <p className="mt-1 text-gray-800">
                      {pendingText || <em>(vacío)</em>}
                    </p>
                    <p className="mt-4 text-sm text-gray-700">
                      Fecha y hora: {new Date().toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700">Rol: {role}</p>
                    <p className="mt-2 text-sm text-gray-700">
                      {isTurnOpen ? 'Inicio de turno' : 'Fin de turno'}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      className="px-4 py-2 rounded border"
                      onClick={() => {
                        setIsReviewOpen(false);
                        resetTranscript();
                      }}
                    >
                      Grabar de nuevo
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                      disabled={!pendingText.trim()}
                      onClick={() => handleSend(!isTurnOpen)}
                    >
                      Enviar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal continuar */}
      {showContinue && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-black text-center">
            <p className="mb-4">Registro guardado. ¿Deseas crear otro?</p>
            <button
              onClick={() => {
                setShowContinue(false);
                resetTranscript();
                setIsReviewOpen(false);
                router.push('/conserjeria/turno');
              }}
              className="mr-2 px-4 py-2 border rounded"
            >
              Sí
            </button>
            <button
              onClick={() => router.push('/conserjeria/conserje')}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
