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
    <section className="h-screen overflow-hidden bg-black text-white">
      <div
        className="
        flex 
        flex-col 
        md:flex-row 
        items-center 
        justify-center 
        h-full 
        gap-6 
        p-4
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
