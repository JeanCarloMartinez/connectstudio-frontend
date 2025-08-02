import React from "react";
import Swal from "sweetalert2";

const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { name: "Estudiantes", page: "students" },
    { name: "Asesores", page: "advisors" },
    { name: "Usuarios de Connect Studio", page: "users" },
    { name: "Cursos", page: "courses" },                // Nuevo
    { name: "Aulas", page: "classrooms" },              // Nuevo
    { name: "Asignaturas", page: "subjects" },          // Nuevo
    { name: "Inscribir Alumno a Curso", page: "enroll" }, // Nuevo
    { name: "Perfil", page: "profile" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 shadow-lg fixed top-0 left-0 flex flex-col">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
        Admin Panel
      </h2>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.page} className="mb-4">
              <button
                onClick={() => setCurrentPage(item.page)}
                className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center ${
                  currentPage === item.page
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
          <li className="mb-4">
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
                    window.location.reload();
                  }
                });
              }}
              className="w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center hover:bg-gray-700 text-gray-300"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-auto text-center text-gray-500 text-sm">
        <p>&copy; 2023 Asesorías TEC</p>
      </div>
    </div>
  );
};

export default AdminSidebar;

// DONE