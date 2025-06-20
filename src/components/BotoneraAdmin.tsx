import React from "react";

interface BotoneraMainAdminProps {
  onNavigate: (route: string) => void;
}

export const BotoneraMainAdmin: React.FC<BotoneraMainAdminProps> = ({
  onNavigate,
}) => {
  const botones = [
    { label: "Gestión usuarios conserjería", route: "/admin/usuarios" },
    { label: "Ver libro de registro", route: "/admin/incidencias" },
    { label: "Gestionar finanzas", route: "/admin/finanzas" },
    { label: "Gestionar mantenimiento", route: "/admin/mantenimiento" },
    { label: "Gestionar comunicación", route: "/admin/comunicacion" },
    { label: "Gestionar normativas", route: "/admin/normativas" },
  ];

  return (
    <nav
      className="
        w-full h-full
        flex flex-col items-center justify-start gap-6
        bg-gray-900 text-white p-6
        rounded-r-3xl    
        overflow-auto
        landscape:py-8    
        lg:justify-center 
        lg:gap-8 lg:p-8        
      "
    >
      {/* Título */}
      <h2 className="text-2xl font-bold mb-4 lg:mb-8">CONSOLA ADMINiNiSTRACIÓN</h2>

      {/* Botones */}
      <ul
        className="
          w-full
          flex flex-col gap-3
          md:gap-4
          lg:gap-6 lg:flex-wrap lg:flex-row lg:justify-center  
        "
      >
        {botones.map((btn) => (
          <li key={btn.route} className="w-full lg:w-auto  ">
            <button
              onClick={() => onNavigate(btn.route)}
              className="
                block w-full text-center
                py-2 px-4
                text-md md:text-base
                font-medium
                rounded-full
                border-2 border-cyan-400
                hover:bg-cyan-400 hover:text-black
                transition
              "
            >
              {btn.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
