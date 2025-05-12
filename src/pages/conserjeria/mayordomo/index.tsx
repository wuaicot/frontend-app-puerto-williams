// client/src/pages/conserjeria/mayordomo.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../../../lib/axios';
import { TurnStatus } from '../../../components/TurnStatus';

export default function MayordomoArea() {
  const router = useRouter();
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    // Fetch tareas de mayordomo
    async function fetchTasks() {
      const { data } = await apiClient.get<string[]>('/conserjeria/mayordomo/');
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <button onClick={() => router.back()} className="text-3xl mb-4">←</button>
      <h1 className="text-2xl mb-6">Área Mayordomo</h1>
      <TurnStatus />
      <ul className="mt-6 space-y-2">
        {tasks.map((t, i) => (
          <li key={i} className="border border-gray-600 p-2 rounded">{t}</li>
        ))}
      </ul>
    </div>
  );
}