// client/src/pages/conserjeria/mayordomo/index.tsx
import React from "react";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainMayordomo } from "../../../components/BotoneraMainMayordomo";

export default function MayordomoArea() {
  return (
    <section
      className="h-screen overflow-hidden bg-black text-white 
      flex flex-col items-center justify-center gap-6
      rounded-lg shadow-lg shadow-white
      transition duration-300 ease-in-out transform"
    >
      <div
        className="flex flex-col w-full items-center justify-center h-full gap-6
        rounded-lg shadow-lg shadow-black
        transition duration-300 ease-in-out transform hover:scale-105"
      >
        <div className="flex flex-col items-center justify-center mt-52">
          <TurnStatus />
          <BotoneraMainMayordomo />
        </div>
      </div>
    </section>
  );
}
