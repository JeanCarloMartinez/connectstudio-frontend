import React, { useState, useRef, useEffect } from "react";

// Importar las funciones del servicio
import { obtenerAsesor } from "../../../services/asesor.service";

const AdvisorHeader = ({ toggleSidebar }) => {
  // useState para manejar el estado del asesor
  const [asesor, setAsesor] = useState(null);

  // useEffect para obtener los datos del asesor
  useEffect(() => {
    const fetchAsesor = async () => {
      try {
        const respuestaBackend = await obtenerAsesor();
        console.log("Respuesta del backend:", respuestaBackend);

        if (respuestaBackend && respuestaBackend.asesor) {
          setAsesor(respuestaBackend.asesor);
          console.log("Datos del asesor:", respuestaBackend.asesor);
        } else {
          console.warn(
            "La respuesta no contiene la propiedad 'asesor':",
            respuestaBackend
          );
        }
      } catch (error) {
        console.error("Error al obtener los datos del asesor:", error);
      }
    };

    fetchAsesor();
  }, []);

  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: "Tienes una nueva asesoría programada para mañana." },
    { id: 2, mensaje: "Un alumno ha enviado una pregunta." },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleNotificationClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between lg:justify-end border-b border-gray-200">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div className="flex items-center space-x-4 relative">
        <span className="text-gray-700 font-medium hidden sm:block">
          Bienvenid@, {asesor ? asesor.nombrecompletousuario : "Asesor"}
        </span>
        {/* Icono de notificaciones */}
        <button
          className="relative focus:outline-none"
          onClick={handleNotificationClick}
        >
          <svg
            className="w-7 h-7 text-indigo-600 hover:text-indigo-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notificaciones.length > 0 && (
            <span className="absolute top-0 right-0 block w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>
        {/* Dropdown de notificaciones */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-12 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in"
            style={{ animation: "fadeIn 0.3s" }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-indigo-700 font-semibold">
                Notificaciones
              </span>
              <button
                className="text-gray-400 hover:text-red-500 text-lg font-bold px-2 focus:outline-none"
                onClick={handleCloseDropdown}
                aria-label="Cerrar notificaciones"
              >
                ×
              </button>
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {notificaciones.length === 0 ? (
                <li className="p-4 text-gray-500">
                  No tienes notificaciones nuevas.
                </li>
              ) : (
                notificaciones.map((n) => (
                  <li
                    key={n.id}
                    className="p-4 border-b last:border-b-0 text-gray-700 hover:bg-indigo-50 transition"
                  >
                    {n.mensaje}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
          A
        </div>
      </div>
    </header>
  );
};

export default AdvisorHeader;
