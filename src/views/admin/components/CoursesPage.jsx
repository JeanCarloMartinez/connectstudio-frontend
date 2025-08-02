import React, { useState } from "react";
import Swal from "sweetalert2";

const CoursesPage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Matemáticas Avanzadas",
      description: "Curso intensivo de álgebra, cálculo y estadística",
      advisorId: "A001",
      advisorMatricula: "MAT12345"
    },
    {
      id: 2,
      name: "Historia Universal",
      description: "Estudio cronológico de los principales eventos históricos",
      advisorId: "A002",
      advisorMatricula: "HIS67890"
    },
    {
      id: 3,
      name: "Programación Web",
      description: "HTML, CSS, JavaScript y frameworks modernos",
      advisorId: "A003",
      advisorMatricula: "PRO11223"
    }
  ]);

  // Ver detalles
  const handleView = (course) => {
    Swal.fire({
      title: course.name,
      html: `
        <strong>Descripción:</strong> ${course.description}<br/>
        <strong>ID Asesor:</strong> ${course.advisorId}<br/>
        <strong>Matrícula Asesor:</strong> ${course.advisorMatricula}
      `,
      icon: "info"
    });
  };

  // Editar curso
  const handleEdit = (course) => {
    Swal.fire({
      title: "Editar curso",
      input: "text",
      inputLabel: "Nuevo nombre del curso",
      inputValue: course.name,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed && result.value.trim() !== "") {
        const updatedCourses = courses.map((c) =>
          c.id === course.id ? { ...c, name: result.value } : c
        );
        setCourses(updatedCourses);
        Swal.fire("Actualizado", "El nombre del curso ha sido modificado", "success");
      }
    });
  };

  // Eliminar curso
  const handleDelete = (course) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Eliminar el curso "${course.name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCourses = courses.filter((c) => c.id !== course.id);
        setCourses(updatedCourses);
        Swal.fire("Eliminado", "El curso ha sido eliminado", "success");
      }
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Lista de Cursos</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nombre del Curso</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Descripción</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID Asesor</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Matrícula Asesor</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="px-4 py-3">{course.name}</td>
              <td className="px-4 py-3">{course.description}</td>
              <td className="px-4 py-3">{course.advisorId}</td>
              <td className="px-4 py-3">{course.advisorMatricula}</td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => handleView(course)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Ver
                </button>
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(course)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesPage;
