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
      <div className="flex min-h-screen flex-col items-center bg-gray-900 p-4 sm:p-8 text-white">
        
        <div className="w-full max-w-md">
          {" "}
          
          {/* <h1 className="mt-16 text-center text-2xl font-bold text-cyan-400">
            Panel de Conserje
          </h1> */}
          
          <div className="-mt-20">
            <BotoneraMainConserjeria />
            </div>
         
          {/* <hr className=" border-gray-700 -mt-4" /> */}
          
          <div className="-mt-12"><TurnStatus /></div>
        </div>
        <div className="mt-4"><Footer /></div>
      </div>
    </>
  );
}
