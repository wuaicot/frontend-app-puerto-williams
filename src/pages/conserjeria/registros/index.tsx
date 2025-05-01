// client/src/pages/conserjeria/registros/index.tsx
import React, { useEffect, useState, Fragment } from "react";
import apiClient from "../../../lib/axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowPathIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

interface Registro {
  id: string;
  timestamp: string;
  description: string;
  entryMethod: string;
}

export default function RegistrosPage() {
  const router = useRouter();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState<Registro | null>(null);

  const fetchRegistros = async () => {
    try {
      const params: any = {};
      if (start) params.start = start;
      if (end) params.end = end;
      const { data } = await apiClient.get<Registro[]>("/novedades", { params });
      setRegistros(data);
    } catch (err) {
      console.error("Error fetching registros:", err);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const sorted = [...registros].sort((a, b) => {
    const diff =
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    return sortAsc ? diff : -diff;
  });

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    doc.text("Mis Registros de Turno", 40, 50);
    // @ts-ignore
    doc.autoTable({
      startY: 80,
      head: [["Fecha y hora", "Método", "Descripción"]],
      body: sorted.map((r) => [
        format(new Date(r.timestamp), "dd/MM/yyyy HH:mm:ss"),
        r.entryMethod,
        r.description,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [55, 125, 255] },
    });
    doc.save(`registros_${format(new Date(), "yyyyMMdd_HHmm")}.pdf`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <button
        onClick={() => router.back()}
        aria-label="Volver"
        className="mb-4 text-2xl hover:opacity-70"
      >
        ←
      </button>
      <h1 className="text-3xl font-semibold mb-6">Libro de Registros 2.0</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <button
          onClick={fetchRegistros}
          title="Actualizar lista"
          className="p-2 bg-gray-800 rounded hover:bg-gray-700"
        >
          <ArrowPathIcon className="w-6 h-6 text-white" />
        </button>

        <div>
          <label htmlFor="fecha-desde" className="block text-sm">
            Desde
          </label>
          <input
            id="fecha-desde"
            type="date"
            aria-label="Fecha desde"
            title="Fecha desde"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded p-1 bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="fecha-hasta" className="block text-sm">
            Hasta
          </label>
          <input
            id="fecha-hasta"
            type="date"
            aria-label="Fecha hasta"
            title="Fecha hasta"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded p-1 bg-gray-800 text-white"
          />
        </div>

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700"
        >
          Orden: {sortAsc ? "Ascendente" : "Descendente"}
        </button>

        <button
          onClick={downloadPDF}
          title="Descargar PDF"
          className="ml-auto flex items-center gap-1 bg-green-600 px-3 py-1 rounded hover:bg-green-700"
        >
          <ArrowDownTrayIcon className="w-5 h-5 text-white" />
          PDF
        </button>
      </div>

      <div className="overflow-y-auto max-h-[60vh]">
        {sorted.map((r) => (
          <div
            key={r.id}
            className="border-b py-2 px-4 hover:bg-gray-800 cursor-pointer flex justify-between"
            onClick={() => setSelected(r)}
          >
            <span>{format(new Date(r.timestamp), "dd/MM/yyyy HH:mm:ss")}</span>
            <span className="italic text-sm">{r.description.slice(0, 40)}…</span>
          </div>
        ))}
      </div>

      {/* Detalle en modal */}
      <Transition appear show={!!selected} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setSelected(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Detalle de Registro
                  </Dialog.Title>
                  <div className="mt-2">
                    {/* Aseguramos que selected no sea null antes de leer sus campos */}
                    {selected && (
                      <>
                        <p>
                          <strong>Fecha y hora:</strong>{" "}
                          {format(
                            new Date(selected.timestamp),
                            "dd/MM/yyyy HH:mm:ss"
                          )}
                        </p>
                        <p>
                          <strong>Método:</strong> {selected.entryMethod}
                        </p>
                        <p className="mt-4 whitespace-pre-wrap">
                          {selected.description}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      className="px-4 py-2 bg-gray-800 text-white rounded"
                      onClick={() => setSelected(null)}
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
