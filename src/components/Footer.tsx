import React from "react";
import {
  QuestionMarkCircleIcon,
  LightBulbIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-4 rounded-2xl border border-violet-500 animate-pulse-slow">
      <div className="container   mx-auto px-4 flex flex-wrap justify-center items-center space-x-8">
        {/* Ayuda */}
        <button
          aria-label="Ayuda"
          className="flex flex-col  items-center text-gray-400 hover:text-white transition"
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
          className="flex flex-col items-center text-gray-400 hover:text-white transition"
        >
          <InformationCircleIcon className="w-8 h-8" />
          <span className="mt-1 text-sm">Información</span>
        </button>
      </div>
    </footer>
  );
};
