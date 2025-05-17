// client/src/pages/admin/usuarios.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../../lib/axios";

// Definimos localmente los enums para no depender de '@prisma/client'
type Role =
  | "ADMIN"
  | "CONSERJE"
  | "MAYORDOMO"
  | "NOCHERO"
  | "JARDINERO"
  | "PISCINERO"
  | "MANTENIMIENTO";
type Status = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "SUSPENDED";

interface User {
  id: string;
  name: string;
  email: string;
  status: Status;
  role: Role;
}

export default function AdminUsuariosPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const { data } = await apiClient.get<User[]>(
          "/admin/users?status=PENDING"
        );
        setUsers(data);
      } catch (err) {
        console.error("Error al obtener usuarios pendientes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const handleApprove = async (userId: string, role: Role) => {
    setApproving(userId);
    try {
      await apiClient.patch(`/admin/users/${userId}/approve`, { role });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err: any) {
      console.error("Error al aprobar usuario:", err);
      alert(err.response?.data?.message || "Error al aprobar usuario");
    } finally {
      setApproving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Cargando solicitudes…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16  bg-black text-white p-8 align-items-center flex flex-col">
      <h1 className="text-2xl mb-4 font-semibold text-center cursor-auto  ">
        Solicitudes desde Conserjería
      </h1>

      {users.length === 0 ? (
        <div className="mt-16 text-center flex flex-col items-center">
          <h2 className="text-xl text-gray-400  mb-4">No hay solicitudes pendientes</h2>
          
          

          <button
            onClick={() => router.push("/admin/mainView")}
            className="py-2 px-6 border border-violet-500 rounded hover:bg-white hover:text-black transition-all duration-200 ease-in-out"
          >
            Volver a la consola
          </button>
        </div>
      ) : (
        <ul className="space-y-6 w-full max-w-2xl">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 border border-gray-700 rounded flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p>
                  <strong>Nombre:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <label htmlFor={`role-select-${user.id}`} className="sr-only">
                  Seleccionar rol
                </label>
                <select
                  id={`role-select-${user.id}`}
                  defaultValue="CONSERJE"
                  onChange={(e) => {
                    const select = e.target as HTMLSelectElement;
                    user.role = select.value as Role;
                  }}
                  className="bg-gray-800 text-white py-1 px-3 rounded"
                >
                  {[
                    "CONSERJE",
                    "MAYORDOMO",
                    "NOCHERO",
                    "JARDINERO",
                    "PISCINERO",
                    "MANTENIMIENTO",
                  ].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleApprove(user.id, user.role)}
                  disabled={approving === user.id}
                  className={`py-2 px-4 rounded-full ${
                    approving === user.id
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-200"
                  } transition`}
                >
                  {approving === user.id ? "Aprobando…" : "Aprobar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => router.push("/admin/mainView")}
        className="mb-6 mt-8 cursor-pointer   translate-y-auto text-3xl hover:opacity-70"
      >
        ←
      </button>
    </div>
  );
}
