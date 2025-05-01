// // client/src/components/RegistrosLibro.tsx
// import React, { useState } from "react";
// import { format } from "date-fns";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { Registro } from "../pages/conserjeria/registros/index";

// interface Props {
//   registros: Registro[];
//   onRefresh: () => void;
// }

// export const RegistrosLibro: React.FC<Props> = ({ registros, onRefresh }) => {
//   const [sortAsc, setSortAsc] = useState(false);

//   // Ordena localmente
//   const sorted = [...registros].sort((a, b) => {
//     const diff =
//       new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
//     return sortAsc ? diff : -diff;
//   });

//   // Genera PDF
//   const downloadPDF = () => {
//     const doc = new jsPDF({ unit: "pt", format: "letter" });
//     doc.setFontSize(14);
//     doc.text("Libro de Registros 2.0", 40, 40);
//     // @ts-ignore
//     doc.autoTable({
//       startY: 70,
//       head: [["Fecha y hora", "Método", "Descripción completa"]],
//       body: sorted.map((r) => [
//         format(new Date(r.timestamp), "dd/MM/yyyy HH:mm"),
//         r.entryMethod,
//         r.description,
//       ]),
//       styles: { fontSize: 9 },
//       headStyles: { fillColor: [30, 30, 40] },
//     });
//     doc.save(`libro_registros_${format(new Date(), "yyyyMMdd_HHmm")}.pdf`);
//   };

//   return (
//     <div className="bg-black text-white p-4 rounded-lg shadow-lg">
//       <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
//         <button
//           onClick={() => setSortAsc(!sortAsc)}
//           className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition"
//         >
//           Orden: {sortAsc ? "Ascendente" : "Descendente"}
//         </button>
//         <button
//           onClick={onRefresh}
//           className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition"
//         >
//           Actualizar lista
//         </button>
//         <button
//           onClick={downloadPDF}
//           className="bg-green-600 px-3 py-1 rounded hover:bg-green-500 transition ml-auto"
//         >
//           Descargar PDF
//         </button>
//       </div>

//       <div className="max-h-[60vh] overflow-y-auto">
//         {sorted.map((r) => (
//           <details
//             key={r.id}
//             className="group mb-2 border border-gray-700 rounded hover:border-gray-500 transition"
//           >
//             <summary className="flex justify-between items-center px-4 py-2 cursor-pointer">
//               <span>
//                 {format(new Date(r.timestamp), "dd/MM/yyyy HH:mm")}
//                 {" — "}
//                 {r.entryMethod}
//               </span>
//               <span className="text-sm text-gray-400 group-open:hidden">
//                 Ver ▶
//               </span>
//               <span className="text-sm text-gray-400 hidden group-open:inline">
//                 Cerrar ▼
//               </span>
//             </summary>
//             <div className="bg-gray-900 px-4 py-3 text-sm whitespace-pre-wrap">
//               {r.description}
//             </div>
//           </details>
//         ))}
//         {sorted.length === 0 && (
//           <p className="text-center text-gray-500 py-8">
//             No hay registros disponibles.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
