import React from "react";
import {
  QuestionMarkCircleIcon,
  LightBulbIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-2 rounded-2xl border border-violet-500 animate-pulse-slow">
      <div className="container flex flex-wrap justify-center items-center space-x-12 ">
        {/* Ayuda */}
        <button
          aria-label="Ayuda"
          className="flex flex-col  items-center text-gray-400 hover:text-white transition ml-2"
        >
          <QuestionMarkCircleIcon className="w-8 h-8" />
          <span className="mt-1 text-sm">Ayuda</span>
        </button>

        {/* Sugerencias */}
        <button
          aria-label="Sugerencias"
          className="flex flex-col items-center text-gray-400 hover:text-white transition"
        >
          <LightBulbIcon className="w-8 h-8" />
          <span className="mt-1 text-sm">Sugerencias</span>
        </button>

        {/* Información */}
        <button
          aria-label="Información"
          className="flex flex-col items-center text-gray-400 hover:text-white transition mr-2"
        >
          <InformationCircleIcon className="w-8 h-8" />
          <span className="mt-1 text-sm">Información</span>
        </button>
      </div>
    </footer>
  );
};
