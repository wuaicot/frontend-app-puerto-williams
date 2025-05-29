// client/RegistrosLibro.tsx
import React, { useState } from "react";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiClient from "../lib/axios";

export interface Registro {
  id: string;
  timestamp: string;
  description: string;
  entryMethod: string;
  isHighlighted?: boolean;
}

interface Props {
  registros: Registro[];
  onRefresh: () => void;
}

export const RegistrosLibro: React.FC<Props> = ({ registros, onRefresh }) => {
  const [sortAsc, setSortAsc] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [methodFilter, setMethodFilter] = useState<string>("ALL");
  const [searchText, setSearchText] = useState("");
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [registroIdToHighlight, setRegistroIdToHighlight] = useState<
    string | null
  >(null);

  const filtered = registros
    .filter((r) => {
      const date = new Date(r.timestamp);
      if (startDate && date < startDate) return false;
      if (endDate && date > endDate) return false;
      if (methodFilter !== "ALL" && r.entryMethod !== methodFilter)
        return false;
      if (!r.description.toLowerCase().includes(searchText.toLowerCase()))
        return false;
      return true;
    })
    .sort((a, b) => {
      const diff =
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      return sortAsc ? diff : -diff;
    });

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    doc.setFontSize(14);
    doc.text("Libro de registros - Puerto Williams", 40, 40);
    autoTable(doc, {
      startY: 70,
      head: [["Fecha y hora", "Método", "Descripción"]],
      body: filtered.map((r) => [
        format(new Date(r.timestamp), "dd/MM/yyyy HH:mm"),
        r.entryMethod,
        r.description,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [30, 30, 40] },
    });
    doc.save(`libro_registros_${format(new Date(), "MMddyyyy_HHmm")}.pdf`);
  };

  const handleHighlightRequest = (id: string) => {
    setRegistroIdToHighlight(id);
    setIsConfirmModalVisible(true);
  };

  const confirmHighlight = async () => {
    if (!registroIdToHighlight) return;
    try {
      await apiClient.post(`/novedades/${registroIdToHighlight}/highlight`);
      setHighlightedIds((prev) => new Set(prev).add(registroIdToHighlight));
      setIsConfirmModalVisible(false);
      setRegistroIdToHighlight(null);
    } catch (error) {
      console.error("Error al resaltar:", error);
      alert("No se pudo resaltar el registro.");
    }
  };

  const cancelHighlight = () => {
    setIsConfirmModalVisible(false);
    setRegistroIdToHighlight(null);
  };

  return (
    <div className="bg-black text-sky-200 p-4 rounded-lg shadow-lg flex flex-col gap-4 border-gray-400 border-2 max-w-full overflow-hidden">
      <section className="mb-4 bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-md sticky top-0 z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-around">
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Desde"
              className="p-2 bg-gray-800 rounded text-gray-200 max-w-[120px]"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Hasta"
              className="p-2 bg-gray-800 rounded text-gray-200 max-w-[120px]"
            />
          </div>
          <label htmlFor="methodFilter" className="sr-only">
            Filtrar por método
          </label>
          <select
            id="methodFilter"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="p-2 bg-gray-800 rounded text-gray-200 border border-gray-700 max-w-xs"
            aria-label="Filtrar por método"
          >
            <option value="ALL">Todos</option>
            <option value="VOICE">Voz</option>
            <option value="MANUAL">Manual</option>
          </select>
          <input
            type="text"
            placeholder="Buscar texto..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-2 bg-gray-800 rounded text-gray-200 w-full max-w-xs"
          />
        </div>

        <div className="flex justify-around mt-4 flex-wrap gap-2">
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="bg-gray-700 px-3 py-1 rounded text-white text-sm"
          >
            Orden: {sortAsc ? "Ascendente" : "Descendente"}
          </button>
          <button
            onClick={onRefresh}
            className="bg-blue-600 px-3 py-1 rounded text-white text-sm"
          >
            Actualizar
          </button>
          <button
            onClick={downloadPDF}
            className="bg-green-600 px-3 py-1 rounded text-white text-sm"
          >
            Descargar PDF
          </button>
        </div>
      </section>

      <section className="overflow-y-auto rounded-lg border shadow-md transition-all duration-300">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 py-8"
            >
              No hay registros disponibles.
            </motion.p>
          ) : (
            filtered.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`mb-2 border rounded shadow transition-all duration-300 ${
                  r.isHighlighted || highlightedIds.has(r.id)
                    ? "border-yellow-300"
                    : "hover:border-gray-500"
                }`}
              >
                <div
                  className={`flex justify-between items-center px-4 py-2 rounded-t ${
                    r.isHighlighted || highlightedIds.has(r.id)
                      ? "bg-yellow-100 text-black"
                      : "bg-gray-900 text-gray-200"
                  }`}
                >
                  <span>
                    {format(new Date(r.timestamp), "dd/MM/yyyy HH:mm")} —{" "}
                    {r.entryMethod}
                  </span>
                  {!r.isHighlighted && !highlightedIds.has(r.id) && (
                    <button
                      onClick={() => handleHighlightRequest(r.id)}
                      className="text-sm text-blue-400 hover:underline"
                    >
                      Resaltar
                    </button>
                  )}
                  {(r.isHighlighted || highlightedIds.has(r.id)) && (
                    <span className="text-sm font-semibold">⭐ Resaltado</span>
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-b ${
                    r.isHighlighted || highlightedIds.has(r.id)
                      ? "bg-yellow-50 text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {r.description}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </section>

      {/* Modal de confirmación */}
      {isConfirmModalVisible && registroIdToHighlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="mb-4">
              ¿Deseas resaltar este registro permanentemente?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelHighlight}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={confirmHighlight}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
