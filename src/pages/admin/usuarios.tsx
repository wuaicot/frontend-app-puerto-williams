import { useEffect, useState } from "react";
import apiClient from "../../lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function GestionUsuariosConserje() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [rolSeleccionado, setRolSeleccionado] = useState<Record<string, string>>({});

  const fetchPendientes = async () => {
    try {
      const { data } = await apiClient.get("/admin/users?status=PENDING");
      setUsuarios(data);
      setLoading(false);
    } catch (err) {
      console.error("Error obteniendo usuarios pendientes:", err);
    }
  };
  useEffect(() => {
    fetchPendientes();
  }, []);

  const aprobar = async (id: string) => {
    const rol = rolSeleccionado[id] || "MAYORDOMO";
    await apiClient.patch(`/admin/users/${id}/approve`, { role: rol });
    fetchPendientes();
  };

  const rechazar = async (id: string) => {
    await apiClient.patch(`/admin/users/${id}/reject`);
    fetchPendientes();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">GESTIÓN USUARIO CONSERJE</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : usuarios.length === 0 ? (
        <p>No hay usuarios pendientes.</p>
      ) : (
        <div className="w-full max-w-xl space-y-6">
          {usuarios.map((u) => (
            <div key={u.id} className="border p-4 rounded bg-gray-900">
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-400">{u.email}</p>

              <label className="block mt-2 text-sm">Asignar Rol:</label>
              <select
                className="bg-black border px-2 py-1 mt-1"
                value={rolSeleccionado[u.id] || "MAYORDOMO"}
                onChange={(e) =>
                  setRolSeleccionado({ ...rolSeleccionado, [u.id]: e.target.value })
                }
                aria-label={`Asignar rol para ${u.name}`}
              >
                <option value="MAYORDOMO">Mayordomo</option>
                <option value="PORTERO">Portero</option>
                <option value="MANTENCION">Mantención</option>
                <option value="PISCINA">Piscina</option>
              </select>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => aprobar(u.id)}
                  className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => rechazar(u.id)}
                  className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
