import React, { useState, useRef, useEffect } from "react";
// import { useEffect, useState } from "react";
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
      // console.log("Datos obtenidos de admin", respuesta.admin);
      // Guardar los datos del admin en una variable
      const admin = respuesta.admin;
      // console.log(admin);
      // Validar si la respuesta fue exitosa
      if (respuesta.success) {
        setNombre(admin.nombrecompletousuario || "Admin");
      }
    }; // Fin de la funcion solicitarDatosAdmin

    // Ejecutar la funcion solicitarDatosAdmin
    solicitarDatosAdmin();
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
    <header className="bg-white shadow-md p-6 flex items-center justify-between fixed top-0 left-64 right-0 z-10">
      <h1 className="text-4xl font-extrabold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        {/* <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
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
        </button> */}
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
