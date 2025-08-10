import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Importar el servicio de asignaturas
import { mostrarAsignaturas } from "./../../../services/asignatura.service";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);

  // Cargar asignaturas al montar el componente
  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await mostrarAsignaturas();
      // console.log("datos recibidos de asignaturas:", response.asignaturas);
      if (response.success) {
        // mapear los datos recibidos para el estado
        const asignaturasFormateadas = response.asignaturas.map(
          (asignatura) => ({
            id: asignatura.idasignatura,
            name: asignatura.nombreasignatura,
          })
        );
        setSubjects(asignaturasFormateadas);
      } else {
        console.error("Error al cargar las asignaturas:", response.message);
      }
    };

    fetchSubjects();
  }, []);

  // Ver detalles
  const handleView = (subject) => {
    Swal.fire({
      title: subject.name,
      html: `<strong>Capacidad de alumnos:</strong> ${subject.capacity}`,
      icon: "info",
    });
  };

  // Editar nombre de la asignatura
  const handleEdit = (subject) => {
    Swal.fire({
      title: "Editar asignatura",
      input: "text",
      inputLabel: "Nuevo nombre de la asignatura",
      inputValue: subject.name,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed && result.value.trim() !== "") {
        const updatedSubjects = subjects.map((s) =>
          s.id === subject.id ? { ...s, name: result.value } : s
        );
        setSubjects(updatedSubjects);
        Swal.fire(
          "Actualizado",
          "El nombre de la asignatura ha sido modificado",
          "success"
        );
      }
    });
  };

  // Eliminar asignatura
  const handleDelete = (subject) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Eliminar la asignatura "${subject.name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSubjects = subjects.filter((s) => s.id !== subject.id);
        setSubjects(updatedSubjects);
        Swal.fire("Eliminado", "La asignatura ha sido eliminada", "success");
      }
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Lista de Asignaturas
      </h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Nombre de la Asignatura
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td className="px-4 py-3">{subject.name}</td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => handleView(subject)}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 transition"
                >
                  Ver
                </button>
                <button
                  onClick={() => handleEdit(subject)}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(subject)}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition"
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

export default SubjectsPage;
