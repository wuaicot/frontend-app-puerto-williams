// src/pages/registro.tsx
import { useState } from "react";
import axios from "@/lib/axios";

export default function Registro() {
  const [form, setForm] = useState({ desiredRole: "", reason: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // o usa context si prefieres

    await axios.post("/api/credentials", {
      userId,
      desiredRole: form.desiredRole,
      reason: form.reason,
    });

    alert("Solicitud enviada. Espera aprobación del administrador.");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-xl mb-4">Solicitar credencial</h2>
      <label htmlFor="desiredRole" className="block mb-2">Selecciona un rol</label>
      <select
        id="desiredRole"
        className="w-full p-2 mb-4"
        onChange={(e) => setForm({ ...form, desiredRole: e.target.value })}
      >
        <option value="">Selecciona un rol</option>
        <option value="MAYORDOMO">Mayordomo</option>
        <option value="PORTERO">Portero</option>
        <option value="MANTENCION">Mantención</option>
      </select>
      <textarea
        className="w-full p-2 mb-4"
        placeholder="Motivo de la solicitud"
        onChange={(e) => setForm({ ...form, reason: e.target.value })}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar solicitud</button>
    </form>
  );
}
