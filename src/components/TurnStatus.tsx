import React, { useState, useEffect } from "react";
import apiClient from "../lib/axios";
import { motion } from "framer-motion";

export const TurnStatus: React.FC = () => {
  const [status, setStatus] = useState<"IN" | "OUT" | null>(null);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [duration, setDuration] = useState<string>("00:00");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await apiClient.get<{
          status: "IN" | "OUT";
          sessionStart: string | null;
        }>("/novedades/current-status");

        setStatus(res.data.status);
        if (res.data.status === "IN" && res.data.sessionStart) {
          setSessionStart(new Date(res.data.sessionStart));
        }
      } catch {
        setError("No se pudo cargar el estado del turno.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    if (status !== "IN" || !sessionStart) return;

    const updateDuration = () => {
      const now = Date.now();
      const diffMs = now - sessionStart.getTime();
      const totalMinutes = Math.floor(diffMs / 60000);
      const hours = Math.floor(totalMinutes / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (totalMinutes % 60).toString().padStart(2, "0");
      setDuration(`${hours}:${minutes}`);
    };

    updateDuration();
    const interval = setInterval(updateDuration, 60_000);

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
      className="mt-8 p-2 bg-blue-900 rounded-lg max-w-md mx-auto
                 text-white shadow-lg transition-transform
                 transform hover:scale-104 duration-300 ease-in-out"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-center mb-2 text-lg font-medium text-slate-300">
        Estado del turno
      </h2>
      <div className="text-xl font-bold text-center mb-2 text-slate-300">
        {status === "IN" ? "🔓 Turno activo" : "🔒 Turno finalizado"}
      </div>
      {status === "IN" && sessionStart && (
        <div className="text-center text-sm text-slate-300 mt-2 font-medium">
          <div>
            Turno iniciado el:{" "}
            {sessionStart.toLocaleDateString()}{" "}
            {sessionStart.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
          <div>
            Tiempo en turno: <strong>{duration}</strong> h
          </div>
        </div>
      )}
    </motion.div>
  );
};
