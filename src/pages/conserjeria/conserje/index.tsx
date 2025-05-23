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
      <div
        className="flex min-h-full flex-col items-center bg-gray-900 p-4 sm:p-8 text-white 
      justify-center"
      >
        <div className="w-full max-w-md">
          {" "}
          <div className="mt-4 flex h-full w-full max-w-md flex-col items-center justify-center gap-6 rounded-4xl border bg-gray-800 p-4 shadow-lg">
            <BotoneraMainConserjeria />
          </div>
          <div className="-mt-6 flex h-full w-full max-w-md flex-col rounded-lg shadow-lg">
            <TurnStatus />
          </div>
        </div>
        <div className=" flex  w-full max-w-lg flex-col rounded-lg shadow-lg mt-2">
          <Footer />
        </div>
      </div>
    </>
  );
}
