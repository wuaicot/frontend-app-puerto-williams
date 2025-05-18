// client/src/pages/conserjeria/turno/manual.tsx
import React, { useState } from "react";
import apiClient from "../../../lib/axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ManualTurnRegistration() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await apiClient.post("/novedades", {
        description: text,
        entryMethod: "MANUAL",
        isLast,
      });
      alert("Registro manual guardado");
      setText("");
      setIsLast(false);
      router.replace("/conserjeria/turno");
    } catch {
      alert("No se pudo guardar el registro manual");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4 bg-black text-white min-h-screen 
    ">
       <button
        onClick={() => router.back()}
        className=" top-4 left-4 text-3xl hover:opacity-70 cursor-pointer transition-opacity duration-300  
        "
      >
        ←
      </button>
      <h2 className="text-xl font-semibold mt-20">Registro Manual</h2>

      <textarea
        rows={4}
        className="border p-2 rounded bg-gray-800 text-white"
        placeholder="Escribe aquí tu registro..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label className="flex items-center gap-2 
      text-gray-200 
      text-sm mt-2">
        <input
          type="checkbox"
          checked={isLast}
          onChange={() => setIsLast(!isLast)}
        />
        <span>Fin de turno</span>
      </label>

      <button
        onClick={handleSave}
        disabled={!text.trim() || loading}
        className="bg-sky-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed 
        hover:bg-sky-600 transition-colors duration-300 mt-4 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Guardar registro"
      >
        {loading ? "Guardando..." : "Guardar registro"}
      </button>
    </div>
  );
}
