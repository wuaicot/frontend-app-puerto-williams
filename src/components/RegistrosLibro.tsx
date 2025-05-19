// client/src/components/RegistrosLibro.tsx
import React, { useState } from "react";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Exporta la interfaz para que pueda ser importada en otros módulos
export interface Registro {
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

  // Filtra y ordena los registros
  const filtered = registros
    .filter((r) => {
      const date = new Date(r.timestamp);
      if (startDate && date < startDate) return false;
      if (endDate && date > endDate) return false;
      if (methodFilter !== "ALL" && r.entryMethod !== methodFilter) return false;
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
    doc.text("Libro de registros_Puerto Williams", 40, 40);
    // Uso de autoTable
    autoTable(doc, {
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
    doc.save(
      `libro_registros_${format(new Date(), "MMddyyyy_HHmm")}.pdf`
    );
  };

  return (
    <div className="bg-black text-sky-200 p-2 rounded-lg shadow-lg flex-wrap gap-4 flex flex-col max-w-full border-gray-400 border-2 animate-pulse-slow">
      {/* Filtros */}
      <section className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-center bg-gray-900 p-2 rounded-lg border border-gray-700 shadow-md transition-all duration-300 sticky">
        <div className="grid grid-cols-1 md:flex-cols-4 gap-4 mb-4 items-center justify-between">
          <div className="flex gap-2 items-center justify-center flex-wrap">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Desde"
              className="p-2 bg-gray-800 max-w-[120px] rounded"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Hasta"
              className="p-2 bg-gray-800 max-w-[120px] rounded"
            />
          </div>
          <select
            aria-label="Filtrar método"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="p-2 bg-gray-800 rounded max-w-[400px] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="MAYORDOMO">Mayordomo</option>
            <option value="NOCHERO">Nocturno</option>
            <option value="JARDINERO">Jardinero</option>
            <option value="PISCINERO">Piscinero</option>
            <option value="MANTENIMIENTO">Mantenimiento</option>
            <option value="CONSERJE">Conserje</option>
            <option value="ALL">Todos</option>
          </select>

          <input
            type="text"
            placeholder="Palabra clave"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-2 bg-gray-800 rounded w-full max-w-[400px] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Acciones */}
        <div className="flex flex-auto items-center justify-between mb-4 gap-2 md:gap-0 p-2 rounded bg-gray-800 border border-gray-700 text-gray-200 shadow-md transition-all duration-300">
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Orden: {sortAsc ? "Ascendente" : "Descendente"}
          </button>
          <button
            onClick={onRefresh}
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 text-white transition"
          >
            Actualizar lista
          </button>
          <button
            onClick={downloadPDF}
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-500 transition ml-auto text-white"
          >
            Descargar PDF
          </button>
        </div>
      </section>

      {/* Listado */}
      <section>
        <div className="overflow-y-auto rounded-lg border shadow-md transition-all duration-300">
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
                  className="group mb-2 border border-gray-700 rounded hover:border-gray-500 transition bg-gray-800 shadow-md"
                >
                  <summary className="flex justify-between items-center px-4 py-2 cursor-pointer text-gray-200 bg-gray-900 rounded-t-lg group-open:bg-gray-800 group-open:border-b-0 group-open:border-gray-700">
                    <span>
                      {format(new Date(r.timestamp), "dd/MM/yyyy HH:mm")} —{" "}
                      {r.entryMethod}
                    </span>
                    <span className="text-sm text-gray-400 group-open:hidden group-open:group-hover:text-gray-200 transition-all duration-300">
                      Ver ▸
                    </span>
                    <span className="text-sm text-gray-400 hidden group-open:inline">
                      Cerrar ×
                    </span>
                  </summary>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-900 px-4 py-3 text-md whitespace-pre-wrap text-white rounded-b-lg group-open:bg-gray-800 group-open:border-t-0 group-open:border-gray-700 group-open:shadow-md group-open:shadow-gray-700 group-open:group-hover:bg-gray-800 group-open:group-hover:border-gray-500"
                  >
                    {r.description}
                  </motion.div>
                </motion.details>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};