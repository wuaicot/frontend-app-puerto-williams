import React, { useState, useEffect } from "react";
import apiClient from "../lib/axios";
import { motion } from "framer-motion";

// LED indicator component
const LedIndicator: React.FC<{ on: boolean }> = ({ on }) => (
  <motion.span
    className={`inline-block w-4 h-4 rounded-full ${
      on ? "bg-green-400  border-black border-3 animate-ping" : "bg-slate-600"
    }`}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [1, 0.7, 1],
    }}
    transition={{ duration: 1, repeat: Infinity }}
  />
);

export const TurnStatus: React.FC = () => {
  const [status, setStatus] = useState<"IN" | "OUT" | null>(null);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [duration, setDuration] = useState<string>("00:00");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch current status
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

  // update duration hh:mm every minute
  useEffect(() => {
    if (status !== "IN" || !sessionStart) return;
    const updateDuration = () => {
      const diffMs = Date.now() - sessionStart.getTime();
      const totalMinutes = Math.floor(diffMs / 60000);
      const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
      const minutes = String(totalMinutes % 60).padStart(2, "0");
      setDuration(`${hours}:${minutes}`);
    };
    updateDuration();
    const interval = setInterval(updateDuration, 60000);
    return () => clearInterval(interval);
  }, [status, sessionStart]);

  if (loading) {
    return (
      <div className="mt-8 flex justify-center">
        <motion.div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
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
      className="mt-8 p-4 bg-gray-800 rounded-lg max-w-md mx-auto text-white shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <LedIndicator on={status === "IN"} />
        {/* <h2 className="text-center text-lg font-semibold text-slate-300">
          Estado del turno
        </h2> */}
      </div>
      <div className="text-center text-xl font-bold mb-4">
        {status === "IN" ? (
          <span className="text-green-300  animate-pulse">Turno activo</span>
        ) : (
          <span className="text-gray-300 animate-pulse">Turno finalizado</span>
        )}
      </div>
      {status === "IN" && sessionStart && (
        <div className="text-center text-sm text-slate-400 space-y-1">
          <div>
            Inicio: {sessionStart.toLocaleDateString()}{" "}
            {sessionStart.toLocaleTimeString([], { hour12: false })}
          </div>
          <div>
            Tiempo: <span className="font-mono text-white">{duration}</span> hrs
          </div>
        </div>
      )}
    </motion.div>
  );
};
