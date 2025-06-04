// client/src/pages/conserjeria/turno/manual.tsx
import React, { useState, useEffect } from "react";
import apiClient from "../../../lib/axios";
import { useRouter } from "next/router";

export default function ManualTurnRegistration() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>("");

  // 1) Obtener rol del usuario al montar
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

  // 2) Guardar registro manual y redirigir según rol
  const handleSave = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await apiClient.post("/novedades", {
        description: text,
        entryMethod: "MANUAL",
        isLast,
      });

      // Redirigir a la vista del rol una vez guardado
      if (role) {
        router.replace(`/conserjeria/${role.toLowerCase()}`);
      } else {
        // En caso de no tener rol (poco probable), volver a /conserjeria/turno
        router.replace("/conserjeria/turno");
      }
    } catch {
      alert("No se pudo guardar el registro manual");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col gap-4">
      {/* Botón de retroceso */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-3xl hover:opacity-70 transition-opacity duration-300"
        aria-label="Volver"
      >
        ←
      </button>

      <h2 className="text-xl font-semibold mt-20">Registro Manual</h2>

      <textarea
        rows={4}
        className="border p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        placeholder="Escribe aquí tu registro..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label className="flex items-center gap-2 text-gray-200 text-sm mt-2">
        <input
          type="checkbox"
          checked={isLast}
          onChange={() => setIsLast((prev) => !prev)}
          className="h-4 w-4 text-sky-500 bg-gray-700 rounded"
        />
        <span>Fin de turno</span>
      </label>

      <button
        onClick={handleSave}
        disabled={!text.trim() || loading}
        className={`mt-4 px-4 py-2 rounded ${loading ? "bg-gray-600" : "bg-sky-500 hover:bg-sky-600"} text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        aria-label="Guardar registro"
      >
        {loading ? "Guardando..." : "Guardar registro"}
      </button>
    </div>
  );
}
