// client/src/pages/conserjeria/conserje/index.tsx
import React from "react";

import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainConserjeria } from "../../../components/BotoneraMainConserjeria";
import Head from "next/head";
import { Footer } from "../../../components/Footer";


export default function ConserjeArea() {
  return (
    <>
      <Head>
        <title>Panel Conserje - Puerto Williams</title>{" "}
      </Head>
      <div className="flex min-h-screen flex-col items-center bg-gray-900 p-4 sm:p-8 text-white 
      justify-center">
        <div className="w-full max-w-md">
          {" "}
          {/* <h1 className="mt-16 text-center text-2xl font-bold text-cyan-400">
            Panel de Conserje
          </h1> */}
          <div className="mt-4 flex h-full w-full max-w-md flex-col items-center justify-center gap-6 rounded-4xl border bg-gray-800 p-4 shadow-lg">
            
            <BotoneraMainConserjeria />
          </div>
          
          <div className="-mt-5 flex h-full w-full max-w-md flex-col gap-6 rounded-lg shadow-lg">
            <TurnStatus />
          </div>
        </div>
        <div className="-mt-0.5">
          <Footer />
        </div>
      </div>
    </>
  );
}
