// client/src/pages/conserjeria/nochero/index.tsx
import React from "react";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainNochero } from "../../../components/BotoneraMainNochero";

export default function NocheroArea() {
  return (
    <div
      className="min-h-screen bg-black text-white p-8
                 flex flex-col items-center justify-center gap-6
                 rounded-lg shadow-lg w-full text-center"
    >
      <h1 className="text-2xl font-semibold mb-4">Turno Noche</h1>
      <p>Panel de control para el turno nocturno: supervisión de cámaras y rondas.</p>

      <div className="mt-4">
        <BotoneraMainNochero />
      </div>

      <div className=" flex flex-col items-center justify-center w-full max-w-sm">
        <TurnStatus />
      </div>
    </div>
  );
}
