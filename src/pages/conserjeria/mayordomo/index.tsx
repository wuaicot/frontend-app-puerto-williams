import React from "react";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainMayordomo } from "../../../components/BotoneraMainMayordomo";
import { Footer } from "../../../components/Footer";

export default function MayordomoArea() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 sm:p-8 lg:p-12">
      <div className="flex flex-col items-center justify-start h-full w-full max-w-lg gap-8">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center gap-4">
          
          <TurnStatus />
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col justify-center items-center w-full">
          <BotoneraMainMayordomo />
        </div>
        
        
      </div>
    </div>
  );
}