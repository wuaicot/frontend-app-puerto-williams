import React, { useState } from "react";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Registro {
  id: string;
  timestamp: string;
  description: string;
  entryMethod: string;
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

  // Filter and sort registros
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
    doc.text("Libro de Registros 2.0", 40, 40);
    // @ts-ignore
    doc.autoTable({
      startY: 70,
      head: [["Fecha y hora", "Método", "Descripción completa"]],
      body: filtered.map((r) => [
        format(new Date(r.timestamp), "dd/MM/yyyy HH:mm"),
        r.entryMethod,
        r.description,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [30, 30, 40] },
    });
    doc.save(`libro_registros_${format(new Date(), "yyyyMMdd_HHmm")}.pdf`);
  };

  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Desde"
          className="p-2 bg-gray-800 rounded"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="Hasta"
          className="p-2 bg-gray-800 rounded"
        />
        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="p-2 bg-gray-800 rounded"
        >
          <option value="ALL">Todos los métodos</option>
          <option value="VOICE">Voz</option>
          <option value="MANUAL">Manual</option>
        </select>
        <input
          type="text"
          placeholder="Buscar descripción..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 bg-gray-800 rounded"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          Orden: {sortAsc ? "Ascendente" : "Descendente"}
        </button>
        <button
          onClick={onRefresh}
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition"
        >
          Actualizar lista
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-600 px-3 py-1 rounded hover:bg-green-500 transition ml-auto"
        >
          Descargar PDF
        </button>
      </div>

      {/* List */}
      <div className="overflow-y-auto max-h-[60vh]">
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
              <motion.details
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="group mb-2 border border-gray-700 rounded hover:border-gray-500 transition"
              >
                <summary className="flex justify-between items-center px-4 py-2 cursor-pointer">
                  <span>
                    {format(new Date(r.timestamp), "dd/MM/yyyy HH:mm")} —{" "}
                    {r.entryMethod}
                  </span>
                  <span className="text-sm text-gray-400 group-open:hidden">
                    Ver ▶
                  </span>
                  <span className="text-sm text-gray-400 hidden group-open:inline">
                    Cerrar ▼
                  </span>
                </summary>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-900 px-4 py-3 text-sm whitespace-pre-wrap"
                >
                  {r.description}
                </motion.div>
              </motion.details>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
