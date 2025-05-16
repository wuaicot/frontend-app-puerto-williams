import React, { useState, useEffect } from "react";
import apiClient from "../lib/axios";
import { motion } from "framer-motion";

export const TurnStatus: React.FC = () => {
  const [status, setStatus] = useState<"IN" | "OUT" | null>(null);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Al montar, obtenemos estado actual y el inicio de sesión
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await apiClient.get<{
          status: "IN" | "OUT";
          sessionStart: string | null;
        }>("/novedades/current-status");

        setStatus(res.data.status);
        if (res.data.status === "IN" && res.data.sessionStart) {
          const start = new Date(res.data.sessionStart);
          setSessionStart(start);
        }
      } catch (err) {
        setError("No se pudo cargar el estado del turno.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  // Iniciar contador basado en sessionStart
  useEffect(() => {
    if (status !== "IN" || !sessionStart) return;

    const updateDuration = () => {
      const now = Date.now();
      const minutes = Math.floor((now - sessionStart.getTime()) / 60000);
      setDuration(minutes);
    };

    updateDuration(); // Llamada inicial
    const interval = setInterval(updateDuration, 60_000); // Cada 1 min

    return () => clearInterval(interval);
  }, [status, sessionStart]);

  if (loading) {
    return (
      <div className="mt-8 flex justify-center">
        <motion.div
          className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-600 text-white rounded text-center">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      className="mt-8 p-4 bg-blue-950 rounded-lg max-w-md mx-auto text-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-center mb-2 text-lg font-medium">
        Estado del turno
      </h2>
      <div className="text-xl font-bold text-center mb-2">
        {status === "IN" ? "🔓 Turno activo" : "🔒 Turno finalizado"}
      </div>
      {status === "IN" && sessionStart && (
        <div className="text-center text-sm text-slate-300">
          Tiempo en turno: <strong>{duration}</strong> minuto
          {duration !== 1 ? "s" : ""}
        </div>
      )}
    </motion.div>
  );
};
