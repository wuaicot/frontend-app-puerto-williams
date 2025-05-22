// client/src/pages/conserjeria/piscina.tsx

import React from "react";
import { useRouter } from "next/router";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainMantenimiento } from "../../../components/BotoneraMainMantenimiento";
import { Footer } from "../../../components/Footer";

export default function PiscinaArea() {
  const router = useRouter();

  return (
    <div className=" bg-black text-white p-8">
      <button
        onClick={() => router.back()}
        className="text-3xl text-white hover:text-gray-400 transition duration-300 "
      >
        ←
      </button>
      {/* <h1 className="text-2xl mb-6">Área MANTENIMIENTO</h1> */}
      <p className="text-lg text-center mb-4 content">
        Control de mantenimiento y prevención del edificio.
      </p>
      <BotoneraMainMantenimiento />
      <section className="-mt-13 p-4 rounded-lg shadow-lg space-y-0.5 items-center justify-center">
        <TurnStatus />
        <Footer />
      </section>
    </div>
  );
}
