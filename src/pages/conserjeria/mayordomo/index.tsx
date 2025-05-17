// client/src/pages/conserjeria/mayordomo/index.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../../../lib/axios";
import { TurnStatus } from "../../../components/TurnStatus";
import { BotoneraMainMayordomo } from "../../../components/BotoneraMainMayordomo";

export default function MayordomoArea() {
  const router = useRouter();
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await apiClient.get<string[]>("/conserjeria/mayordomo");
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <section
      className="h-screen overflow-hidden bg-black text-white 
    flex flex-col 
    items-center
    justify-center
    gap-6   
    rounded-lg
    shadow-lg
    shadow-white 
    transition
    duration-300
    ease-in-out
    transform    
    "
    >
      <div
        className="
        flex 
        flex-col 
        w-full 
        items-center 
        justify-center 
        h-full 
        gap-6 
        
        rounded-lg
        shadow-lg
        shadow-black
        
        
        transition
        duration-300
        ease-in-out
        transform
        hover:scale-105
          hover:transition-all
        hover:duration-300
        hover:ease-in-out
        

        
      "
      >
        <div className=" flex-col items-center justify-center mt-52">
          <TurnStatus />
          <BotoneraMainMayordomo />
        </div>
      </div>
    </section>
  );
}
