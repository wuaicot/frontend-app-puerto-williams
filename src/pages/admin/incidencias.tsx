import React, { useEffect, useState } from "react";
import apiClient from "../../lib/axios";
import { RegistrosLibro } from "../../components/RegistrosLibro";
import Link from "next/link";

export interface Registro {
  id: string;
  timestamp: string;
  description: string;
  entryMethod: string;
}

export default function AdminRegistrosPage() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistros = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get<Registro[]>("/admin/incidencias");
      setRegistros(data);
    } catch (err) {
      console.error("Error fetching registros:", err);
      setError("No se pudieron cargar los registros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link
        href="/admin/mainView"
        className="relative translate-y-112 text-3xl hover:opacity-70 animate-pulse"
      >
        ←
      </Link>

      <h1 className="  text-2xl font-semibold mb-4 ml-25 ">Libro de registros</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <RegistrosLibro registros={registros} onRefresh={fetchRegistros} />
      {loading && (
        <p className="mt-4 text-center text-gray-400">Cargando registros...</p>
      )}
    </div>
  );
}
