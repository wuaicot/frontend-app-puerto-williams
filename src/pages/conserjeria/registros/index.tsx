// client/src/pages/conserjeria/registros/index.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../../../lib/axios";
import { RegistrosLibro, Registro } from "../../../components/RegistrosLibro";

export default function RegistrosPage() {
  const router = useRouter();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Trae todos los registros */
  const fetchRegistros = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get<Registro[]>("/novedades");
      setRegistros(data);
    } catch (err: unknown) {
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
    <div className="min-h-screen bg-black text-white p-8 flex flex-col">
      {/* Botón de volver */}
      <button
        onClick={() => router.back()}
        className="self-start text-3xl hover:opacity-70 mb-4"
      >
        ←
      </button>

      <h1 className="text-2xl font-semibold text-center mb-6">
        Libro de Registros
      </h1>

      {error && (
        <p className="text-red-500 mb-4 text-center">{error}</p>
      )}

      {/* Listado de registros */}
      <div className="flex-1">
        <RegistrosLibro registros={registros} onRefresh={fetchRegistros} />
        {loading && (
          <p className="mt-4 text-center text-gray-400">
            Cargando registros…
          </p>
        )}
      </div>

      {/* Botón de volver al final */}
      <button
        onClick={() => router.back()}
        className="self-start text-3xl hover:opacity-70 mt-6"
      >
        ←
      </button>
    </div>
  );
}
