import React, { useEffect, useState } from "react";
import apiClient from "../../../lib/axios";
import { RegistrosLibro } from "../../../components/RegistrosLibro";
import Link from "next/link";
// Define the shape of a Registro as returned by the API
export interface Registro {
  id: string;
  timestamp: string;
  description: string;
  entryMethod: string;
}

export default function RegistrosPage() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch registros from the backend
  const fetchRegistros = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get<Registro[]>("/novedades");
      setRegistros(data);
    } catch (err: any) {
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
      <Link href="/conserjeria/conserje" className="relative translate-y-112 text-3xl hover:opacity-70">
        ←
      </Link>
      <h1 className="text-2xl font-semibold mb-4 ml-20">Libro de Registros</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <RegistrosLibro registros={registros} onRefresh={fetchRegistros} />

      {loading && (
        <p className="mt-4 text-center text-gray-400">Cargando registros...</p>
      )}
     <Link href="/conserjeria/conserje" className="relative translate-y-112 text-3xl hover:opacity-70">
        ←
      </Link>
    </div>
  );
}
