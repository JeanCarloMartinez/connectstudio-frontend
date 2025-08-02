import React, { useState } from "react";
import Swal from "sweetalert2";

const ClassroomsPage = () => {
  const [classrooms, setClassrooms] = useState([
    { idAula: "A001", name: "Laboratorio de Cómputo" },
    { idAula: "A002", name: "Aula Magna" },
    { idAula: "A003", name: "Salón de Usos Múltiples" }
  ]);

  // Ver detalles del aula
  const handleView = (classroom) => {
    Swal.fire({
      title: classroom.name,
      html: `<strong>ID del Aula:</strong> ${classroom.idAula}`,
      icon: "info"
    });
  };

  // Editar nombre del aula
  const handleEdit = (classroom) => {
    Swal.fire({
      title: "Editar Aula",
      input: "text",
      inputLabel: "Nuevo nombre del aula",
      inputValue: classroom.name,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed && result.value.trim() !== "") {
        const updatedClassrooms = classrooms.map((c) =>
          c.idAula === classroom.idAula ? { ...c, name: result.value } : c
        );
        setClassrooms(updatedClassrooms);
        Swal.fire("Actualizado", "El nombre del aula ha sido modificado", "success");
      }
    });
  };

  // Eliminar aula
  const handleDelete = (classroom) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Eliminar el aula "${classroom.name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedClassrooms = classrooms.filter((c) => c.idAula !== classroom.idAula);
        setClassrooms(updatedClassrooms);
        Swal.fire("Eliminado", "El aula ha sido eliminada", "success");
      }
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Lista de Aulas</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID Aula</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nombre del Aula</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {classrooms.map((classroom) => (
            <tr key={classroom.idAula}>
              <td className="px-4 py-3">{classroom.idAula}</td>
              <td className="px-4 py-3">{classroom.name}</td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => handleView(classroom)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Ver
                </button>
                <button
                  onClick={() => handleEdit(classroom)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(classroom)}
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

export default ClassroomsPage;