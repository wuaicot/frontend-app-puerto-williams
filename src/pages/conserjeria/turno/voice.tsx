// client/src/pages/conserjeria/turno/voice.tsx
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import apiClient from "../../../lib/axios";
import { TurnStatus } from "../../../components/TurnStatus";
import Link from "next/link";

export default function VoiceTurnRegistration() {
  const router = useRouter();
  const [role, setRole] = useState<string>("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [pendingText, setPendingText] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [isLast, setIsLast] = useState(false); // <-- nuevo
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

  function startListening() {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  }
  function stopListening() {
    SpeechRecognition.stopListening();
    setPendingText(transcript);
    setIsReviewOpen(true);
  }

  // 3) Envía el registro (IN u OUT según isLast)
  async function handleSend() {
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
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      <button
        onClick={() => router.back()}
        className="absolute top-8 left-4 text-3xl hover:opacity-70 cursor-pointer"
      >
        ←
      </button>
      <h1 className="mt-12 text-2xl font-semibold text-center">
        Registro por Voz
      </h1>
      <TurnStatus />

      <div className="flex flex-col items-center justify-center mt-12">
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
          aria-label="Mantén pulsado para grabar"
          className="relative p-6 bg-sky-500 rounded-full"
        >
          <span className="absolute -inset-1 rounded-full bg-sky-500 opacity-50 animate-ping" />
          <SpeakerWaveIcon className="relative w-16 h-16 text-black" />
        </button>
        <p className="mt-8 text-white">
          {listening ? "Escuchando..." : "Mantén presionado para grabar"}
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
                <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Revisión de Registro
                  </Dialog.Title>

                  <div className="mt-2 text-left space-y-3">
                    <p className="text-sm text-gray-700">Texto transcrito:</p>
                    <p className="mt-1 text-gray-800 whitespace-pre-wrap">
                      {pendingText || <em>(vacío)</em>}
                    </p>

                    <p className="mt-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="fin-turno"
                        checked={isLast}
                        onChange={() => setIsLast(!isLast)}
                      />
                      <label
                        htmlFor="fin-turno"
                        className="text-sm text-gray-700"
                      >
                        Marcar como fin de turno
                      </label>
                    </p>

                    <p className="text-sm text-gray-700">
                      Fecha y hora: {new Date().toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700">Rol: {role}</p>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      className="px-4 py-2 rounded-lg    text-white hover:bg-sky-400 transition bg-orange-400 cursor-pointer border"
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
          </div>
        </Dialog>
      </Transition>

      {/* Modal continuar o salir */}
      {showContinue && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-black text-center">
            <p className="mb-4">Registro guardado. ¿Deseas crear otro?</p>
            <button
              onClick={() => {
                setShowContinue(false);
                resetTranscript();
                router.push("/conserjeria/turno");
              }}
              className="mr-2 px-4 py-2 border"
            >
              Sí
            </button>
            <button
              onClick={() => router.push("/conserjeria/turno")}
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
