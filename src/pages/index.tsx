//client/src/pages/index.tsx
import React from "react"; // Asegúrate de importar React si es necesario (aunque en Next.js moderno a veces no es explícito)

// Componente funcional para la página de inicio
export default function LandingPage() {
  // Funciones placeholder para los clics de los botones (las implementaremos luego)
  const handleAdminClick = () => {
    console.log("Botón Admin presionado");
    // Aquí iría la lógica para redirigir a /admin/login o similar
  };

  const handleRegisterClick = () => {
    console.log("Botón Registrarse presionado");
    // Aquí iría la lógica para redirigir a /register o mostrar un modal
  };

  const handleConserjeClick = () => {
    console.log("Botón Conserje presionado");
    // Aquí iría la lógica para redirigir a /conserje/login o similar
  };

  return (
    // Contenedor principal: fondo negro, altura completa, centrado flex
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      {/* Título de la página (opcional, como en la imagen) */}
      <h1 className="absolute top-20 text-xl mb-12">EDIFICIO PUERTO WILLIAMS</h1>

      {/* Contenedor de los botones */}
      <h4>Ingresar como</h4>
      <div className="flex flex-col items-center gap-y-6">
        {" "}
        {/* Aumentado el gap para más espacio */}
        {/* Botón Admin */}
        <button
          onClick={handleAdminClick}
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px] text-center" // Estilo similar a la imagen
        >
          Admin.
        </button>
       
        {/* Botón Conserje */}
        <button
          onClick={handleConserjeClick}
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out min-w-[200px] text-center" // Estilo similar a la imagen
        >
          Conserje
        </button>

         {/* Botón Registrarse */}
         <button
          onClick={handleRegisterClick}
          className="bg-black text-white border border-white font-semibold py-2 px-8 rounded-md shadow-md hover:bg-gray-800 hover:border-gray-400 transition duration-300 ease-in-out min-w-[200px] text-center" // Estilo diferente como en la imagen
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
