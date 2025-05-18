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
    <div
      className="min-h-screen mt-16  bg-black text-white p-8 align-items-center flex flex-col 
    justify-center items-center
    gap-4 rounded-lg shadow-lg border border-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl"
    >
      <h1
        className="text-2xl mb-4 font-semibold text-center cursor-auto  
      text-violet-500"
      >
        <span className="text-white">✔️</span> Aprobación de Solicitudes desde
        Conserjería
      </h1>

      {users.length === 0 ? (
        <div
          className="mt-16 text-center flex flex-col items-center 
        justify-center gap-4 
        bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          <h2
            className="text-xl text-gray-400  mb-4 
          font-semibold text-center cursor-auto"
          >
            No hay solicitudes pendientes
          </h2>

          <button
            onClick={() => router.push("/admin/mainView")}
            className="py-2 px-6 border border-violet-500 rounded hover:bg-white hover:text-black transition-all duration-200 ease-in-out 
            transform hover:scale-105 hover:shadow-xl 
           "
          >
            Volver a la consola
          </button>
        </div>
      ) : (
        <ul
          className="space-y-6 w-full max-w-2xl 
        bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 border border-gray-700 rounded flex flex-col md:flex-row md:items-center md:justify-between 
              bg-gray-900 hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-105 
              hover:shadow-xl 
              gap-4"
            >
              <div>
                <p>
                  <strong>Nombre:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div
                className="mt-4 md:mt-0 flex items-center gap-4 
               justify-between 
               md:justify-end w-full md:w-auto 
               bg-gray-800 rounded-lg shadow-lg border border-gray-700   transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <label
                  htmlFor={`role-select-${user.id}`}
                  className="sr-only 
                  "
                  onClick={() => {
                    const select = document.getElementById(`role-select-${user.id}`) as HTMLSelectElement;
                    select.focus();
                  }}
                >
                  Seleccionar rol
                </label>
                <select
                  id={`role-select-${user.id}`}
                  defaultValue="Asigne un Rol"
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
                    "Asigne un Rol",
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
                      ? "bg-gray-600 cursor-not-allowed text-gray-400"
                      : "bg-white text-black hover:bg-cyan-200 "
                  } transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl`}
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
        className="mb-6 mt-8 cursor-pointer   translate-y-auto text-3xl hover:opacity-70 
        transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl
        bg-gray-800 text-white py-2 px-4 rounded-full border border-gray-700 shadow-lg"
      >
        ←
      </button>
    </div>
  );
}
