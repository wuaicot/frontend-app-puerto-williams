import React, { useState } from "react";
import apiClient from "../../../lib/axios";

export default function ManualTurnRegistration() {
  const [text, setText] = useState("");
  const [isLast, setIsLast] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) return;
    try {
      await apiClient.post('/api/novedades', {
        description: text,
        entryMethod: 'VOICE',
        isLast,
      });
      
      alert("Registro manual guardado");
      setText("");
      setIsLast(false);
    } catch {
      alert("No se pudo guardar el registro manual");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4 bg-black text-white min-h-screen">
      <h2 className="text-xl font-semibold">Registro Manual</h2>
      <textarea
        rows={4}
        className="border p-2 rounded bg-gray-800 text-white"
        placeholder="Escribe tu registro..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isLast}
          onChange={() => setIsLast(!isLast)}
        />
        Fin de turno
      </label>
      <button
        onClick={handleSave}
        disabled={!text.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Guardar registro
      </button>
    </div>
  );
}
