// client/src/pages/conserjeria/turno/voice.tsx
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import apiClient from "../../../lib/axios";
import { TurnStatus } from "../../../components/TurnStatus";

export default function VoiceTurnRegistration() {
  const router = useRouter();
  const [role, setRole] = useState<string>("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [pendingText, setPendingText] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1) Validar estado & rol de usuario
  useEffect(() => {
    apiClient
      .get<{ status: string; role: string }>("/auth/status")
      .then((res) => {
        if (res.data.status !== "APPROVED") {
          router.replace("/pendiente-aprobacion");
        } else {
          setRole(res.data.role);
        }
      })
      .catch(() => router.replace("/"));
  }, [router]);

  // 2) Reconocimiento de voz
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

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setPendingText(transcript);
    setIsReviewOpen(true);
  };

  // 3) Envía el registro (IN u OUT según isLast)
  const handleSend = async () => {
    if (!pendingText.trim()) return;
    setLoading(true);
    try {
      await apiClient.post("/novedades", {
        description: pendingText,
        entryMethod: "VOICE",
        isLast,
      });
      setIsReviewOpen(false);
      setShowContinue(true);
    } catch {
      alert("No se pudo guardar el registro de voz");
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    router.replace(`/conserjeria/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 relative flex flex-col items-center justify-center md:p-16 lg:p-24">
      {/* Botón volver */}
      <button
        onClick={() => router.back()}
        className="absolute top-8 left-4 text-3xl hover:opacity-70 transition-opacity duration-300"
        aria-label="Volver"
      >
        ←
      </button>

      {/* Título y estado */}
      <h1 className="mt-12 text-2xl font-semibold text-center md:text-3xl lg:text-4xl">
        Registro por Voz
      </h1>
      <TurnStatus />

      {/* Botón de grabación */}
      <div className="flex flex-col items-center justify-center mt-12 gap-8 text-center md:gap-12 lg:gap-16">
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
          aria-label="Mantén pulsado para grabar"
          className={`relative p-6 rounded-full text-white shadow-lg transition-transform transform hover:scale-105 active:scale-95
            ${
              listening
                ? "bg-cyan-300 active:shadow-black"
                : "bg-lima-500 active:shadow-xl"
            }`}
        >
          {/* ping dinámico según listening */}
          <span
            className={`absolute -inset-1 rounded-full opacity-50 animate-ping ${
              listening ? "bg-cyan-300" : "bg-sky-500"
            }`}
          />
          <MicrophoneIcon className="relative w-16 h-16 text-black" />
        </button>
        <p className="mt-8 text-lg md:text-xl lg:text-2xl">
          {listening
            ? "Escuchando..."
            : "Mantén presionado para grabar y luego suelta"}
        </p>
      </div>

      {/* Modal de revisión */}
      <Transition appear show={isReviewOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsReviewOpen(false)}
        >
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

          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transform text-gray-900">
                <Dialog.Title className="text-lg font-medium mb-4">
                  Revisión de Registro
                </Dialog.Title>
                <div className="space-y-3 mb-4 text-left">
                  <p className="text-sm text-gray-700">Texto transcrito:</p>
                  <div className="mt-1 text-gray-800 whitespace-pre-wrap bg-gray-100 p-2 rounded-lg border border-gray-300 shadow-sm h-32 overflow-y-auto">
                    {pendingText || <em>(vacío)</em>}
                  </div>

                  {/* Checkbox “Fin de turno” */}
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={isLast}
                      onChange={() => setIsLast(!isLast)}
                    />
                    <span className="cursor-pointer">Fin de turno</span>
                  </label>

                  <p className="text-sm text-gray-700">
                    Fecha y hora: {new Date().toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">Rol: {role}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => {
                      setIsReviewOpen(false);
                      resetTranscript();
                    }}
                  >
                    Grabar de nuevo
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!pendingText.trim() || loading}
                    onClick={handleSend}
                  >
                    {loading ? "Guardando..." : "Enviar"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Modal “¿Crear otro o salir?” */}
      {showContinue && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm w-full">
            <h2 className="text-black text-lg font-semibold mb-2">¡Listo!</h2>
            <p className="mb-4 text-black text-lg">
              Registro guardado. ¿Deseas crear otro?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 border rounded bg-gray-800 text-white hover:bg-gray-700 transition"
                onClick={() => {
                  setShowContinue(false);
                  resetTranscript();
                  router.replace("/conserjeria/turno");
                }}
              >
                Sí
              </button>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                onClick={goHome}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
