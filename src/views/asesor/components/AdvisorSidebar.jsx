import React from "react";
import Swal from "sweetalert2";
const AdvisorSidebar = ({ isOpen, toggleSidebar, onNavigate }) => {
  const baseClasses =
    "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 rounded-r-2xl";
  const openClasses = "translate-x-0";
  const closedClasses = "-translate-x-full";

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`${baseClasses} ${isOpen ? openClasses : closedClasses}`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Connect Studio
          </h2>
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <button
                onClick={() => {
                  onNavigate("dashboard");
                  toggleSidebar();
                }}
                className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-7-7v10a1 1 0 01-1 1h-3"
                  ></path>
                </svg>
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate("courses");
                  toggleSidebar();
                }}
                className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13.486m0-13.486a4.5 4.5 0 014.5-4.5h2.25m-4.5 4.5v13.486m0-13.486a4.5 4.5 0 00-4.5-4.5H5.25m7.5 4.5H12m0 0H5.25M12 18.75h.25M12 12.75h.25m-4.5 0h.25m-4.5 0h.25M12 12.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.253a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75v6.497z"
                  ></path>
                </svg>
                Cursos
              </button>
            </li>
            {/* <li>
              <button
                onClick={() => {
                  onNavigate("advisories");
                  toggleSidebar();
                }}
                className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  ></path>
                </svg>
                Asesorías
              </button>
            </li> */}
            <li>
              <button
                onClick={() => {
                  onNavigate("profile");
                  toggleSidebar();
                }}
                className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                Perfil
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate("agenda");
                  toggleSidebar();
                }}
                className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3M4 11h16M4 19h16M4 11v8a2 2 0 002 2h12a2 2 0 002-2v-8"
                  ></path>
                </svg>
                Agenda
              </button>
            </li>
            <li>
              <button
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
                className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3M4 11h16M4 19h16M4 11v8a2 2 0 002 2h12a2 2 0 002-2v-8"
                  ></path>
                </svg>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdvisorSidebar;
