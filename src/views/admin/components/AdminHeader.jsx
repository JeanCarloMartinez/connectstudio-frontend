import { useEffect, useState } from "react";
// Importar el servicio
import { obtenerAdmin } from "./../../../services/admin.service";

const AdminHeader = ({ title }) => {
  // Declarar estados para las variables
  const [nombre, setNombre] = useState("Admin");
  // Al cargar la pagina por primera vez, se ejecuta esta funcion
  useEffect(() => {
    // Funcion que solicita los datos del admin al servidor
    const solicitarDatosAdmin = async () => {
      // Obtener dinamicamente los datos del admin
      const respuesta = await obtenerAdmin();
      console.log("Datos obtenidos de admin", respuesta.admin);
      // Guardar los datos del admin en una variable
      const admin = respuesta.admin;
      console.log(admin);
      // Validar si la respuesta fue exitosa
      if (respuesta.success) {
        setNombre(admin.nombrecompletousuario || "Admin");
      }
    }; // Fin de la funcion solicitarDatosAdmin

    // Ejecutar la funcion solicitarDatosAdmin
    solicitarDatosAdmin();
  }, []);

  return (
    <header className="bg-white shadow-md p-6 flex items-center justify-between fixed top-0 left-64 right-0 z-10">
      <h1 className="text-4xl font-extrabold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h2a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h2m2 2h6a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2zm-1-9h.01"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            AD
          </div>
          <span className="text-gray-700 font-medium">{nombre}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
