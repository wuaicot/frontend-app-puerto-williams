// client/src/pages/admin/mainView.tsx
import React from "react";
import { useRouter } from "next/router";
import { BotoneraMainAdmin } from "../../components/BotoneraMainAdmin";
import { Footer } from "../../components/Footer";
const MainViewAdmin: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center flex-col sm:p-8 ">
      
      <BotoneraMainAdmin onNavigate={handleNavigate} />
      <div className="mt-28 cursor-pointer"><Footer /></div>
      
    </div>    
  );
  
};

export default MainViewAdmin;
//"flex min-h-screen flex-col items-center bg-gray-900 p-4 sm:p-8 text-white"