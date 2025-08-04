import { useState } from "react";
import React from "react";
import Swal from "sweetalert2";

const LayoutHeader = ({ currentPage, onNavigate }) => {
  // Añadir estado para controlar el menu movil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", page: "home" },
    { name: "Asesorías", page: "advisories" },
    { name: "Mis Asesorías", page: "myAdvisories" }, // Nueva navegación
    { name: "Agenda", page: "agenda" },
    // { name: "Recompensas", page: "rewards" },
    { name: "Perfil", page: "profile" },
    // { name: "Mensajes", page: "messages" },
  ];

  return (
    <>
      <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-200">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">Connect Studio</h1>
        </div>

        {/* 🔽 Aquí va el botón hamburguesa */}
        <button
          className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-600"
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
            />
          </svg>
        </button>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`text-lg font-medium transition-colors ${
                currentPage === item.page
                  ? "text-indigo-600 border-b-2 border-indigo-600" // Color principal cambiado
                  : "text-gray-600 hover:text-indigo-500" // Color principal cambiado
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
        {/* <div className="flex items-center space-x-4"> */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg
              className="w-6 h-6 text-gray-600"
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
              ></path>
            </svg>
          </button>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => {
              Swal.fire({
                title: "¿Estás seguro?",
                text: "Se cerrará tu sesión actual.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  window.location.href = "/";
                }
              });
            }}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="absolute top-16 left-4 right-4 bg-white shadow-lg rounded-md p-4 z-40 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                onNavigate(item.page);
                setIsMenuOpen(false); // Cierra el menú al dar clic
              }}
              className="block w-full text-left py-2 ..."
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default LayoutHeader;
