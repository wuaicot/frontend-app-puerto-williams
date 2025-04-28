// client/src/pages/admin/mainView.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { BotoneraMainAdmin } from '../../../src/components/BotoneraMainAdmin';

const MainViewAdmin: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <BotoneraMainAdmin onNavigate={handleNavigate} />
    </div>
  );
};

export default MainViewAdmin;
