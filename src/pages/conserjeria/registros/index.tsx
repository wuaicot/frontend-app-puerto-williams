import React, { useEffect, useState } from 'react';
import apiClient from '../../../lib/axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

interface Registro {
  id: string;
  timestamp: string;
  description: string;
  entryMethod: string;
}

export default function RegistrosPage() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  const fetchRegistros = async () => {
    const params: any = {};
    if (start) params.start = start;
    if (end) params.end = end;
    const { data } = await apiClient.get<Registro[]>('/api/novedades', { params });
    setRegistros(data);
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const sorted = [...registros].sort((a, b) => {
    const diff = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    return sortAsc ? diff : -diff;
  });

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    doc.text('Registros de Turno', 40, 50);
    // @ts-ignore
    doc.autoTable({
      startY: 80,
      head: [['Fecha y hora', 'Método', 'Descripción']],
      body: sorted.map((r) => [
        format(new Date(r.timestamp), 'dd/MM/yyyy HH:mm:ss'),
        r.entryMethod,
        r.description,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [55, 125, 255] },
    });
    doc.save(`registros_${format(new Date(), 'yyyyMMdd_HHmm')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold mb-6">Mis Registros de Turno</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm">Desde</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded p-1"
            placeholder="Seleccione una fecha"
            title="Seleccione la fecha de inicio"
          />
        </div>
        <div>
          <label className="block text-sm">Hasta</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded p-1"
            placeholder="Seleccione una fecha"
            title="Seleccione la fecha de fin"
          />
        </div>
        <button
          onClick={fetchRegistros}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          Filtrar
        </button>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          Orden: {sortAsc ? 'Ascendente' : 'Descendente'}
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition ml-auto"
        >
          Descargar PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2">Fecha y hora</th>
              <th className="px-4 py-2">Método</th>
              <th className="px-4 py-2">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">
                  {format(new Date(r.timestamp), 'dd/MM/yyyy HH:mm:ss')}
                </td>
                <td className="px-4 py-2">{r.entryMethod}</td>
                <td className="px-4 py-2">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
