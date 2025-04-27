// client/src/pages/conserjeria/mainView.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { BotoneraMainConserjeria } from '../../components/BotoneraMainConserjeria';

export default function ConserjeriaMainView() {
  const router = useRouter();
  const handleNavigate = (route: string) => router.push(route);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <BotoneraMainConserjeria onNavigate={handleNavigate} />
    </div>
  );
}
