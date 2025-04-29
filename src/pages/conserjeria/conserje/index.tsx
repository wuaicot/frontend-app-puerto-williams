// client/src/pages/conserjeria/conserje.tsx
import React from "react";
import { useRouter } from "next/router";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainConserjeria } from "../../../components/BotoneraMainConserjeria";

export default function ConserjeArea() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-8">
      <BotoneraMainConserjeria />
      <TurnStatus />
    </div>
  );
}
