// client/src/pages/admin/mainView.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Footer } from "../../components/Footer";
import { BotoneraMainAdmin } from "../../components/BotoneraAdmin";
import Link from "next/link";

const MainViewAdmin: React.FC = () => {
  const router = useRouter();
  const [isLandscape, setIsLandscape] = useState(false);

  // Detectar orientación para móvil/tablet
  useEffect(() => {
    const mm = window.matchMedia("(orientation: landscape)");
    const onChange = (e: MediaQueryListEvent) => setIsLandscape(e.matches);
    setIsLandscape(mm.matches);
    mm.addEventListener("change", onChange);
    return () => mm.removeEventListener("change", onChange);
  }, []);

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <motion.div
      initial={false}
      animate={isLandscape ? "land" : "port"}
      variants={{
        port: { flexDirection: "column" },
        land: { flexDirection: "row" },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="
        h-screen w-screen
        flex overflow-hidden bg-black text-white
        /* móvil/tablet portrait/landscape */
        portrait:flex-col landscape:flex-row
        /* para pantallas grandes siempre sidebar + contenido */
        lg:flex-row
      "
    >
      {/* Sidebar */}
      <div
        className="
          bg-gray-900
          flex-shrink-0
          /* móvil/tablet: ocupa 100% ancho en portrait, 50% en landscape */
          portrait:w-full landscape:w-1/2
          /* desktop: fijo 1/6 del ancho */
          lg:w-1/6
          flex items-center justify-center
          p-4
        "
      >
        <BotoneraMainAdmin onNavigate={handleNavigate} />
      </div>

      {/* Main Content */}
      <div
        className="
          flex-1
          /* móvil/tablet: debajo en portrait, al lado en landscape */
          portrait:w-full landscape:w-1/2
          /* desktop: resto del espacio */
          lg:flex-1
          flex items-center justify-center
          p-4
          overflow-auto
          bg-black
        "
      >
        <Footer />
      </div>

      {/* Botón “←” siempre fijo arriba-izquierda */}
      <Link
        href="/"
        className="
          absolute top-4 left-4 text-2xl hover:opacity-70 cursor-pointer z-50
          text-cyan-400
        "
      >
        ←
      </Link>
    </motion.div>
  );
};

export default MainViewAdmin;
