// client/src/pages/admin/mainView.tsx
import React from "react";
import { useRouter } from "next/router";
import { Footer } from "../../components/Footer";
import { BotoneraMainAdmin } from "../../components/BotoneraMainAdmin"; // Asegúrate de que la B y M sean mayúsculas

const MainViewAdmin: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center flex-col sm:p-8">
      <BotoneraMainAdmin onNavigate={handleNavigate} />
      <div className="mt-28">
        <Footer />
      </div>
    </div>
  );
};

export default MainViewAdmin;
