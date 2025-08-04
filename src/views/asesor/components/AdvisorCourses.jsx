import React, { useState, useEffect } from "react";
import { mostrarCursosPorMatricula } from "../../../services/curso.service";
import { obtenerAsesor } from "../../../services/asesor.service";
import { mostrarActividadesPorCurso } from "../../../services/actividad.service";
// Importar la funcion registrarCurso del servicio
import { registrarCurso } from "../../../services/curso.service";
// Importar la funcion mostrarAsignaturas del servicio
import { mostrarAsignaturas } from "../../../services/asignatura.service";

const AdvisorCourses = () => {
  const [cursos, setCursos] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseSubject, setNewCourseSubject] = useState("");

  const [asesor, setAsesor] = useState(null);
  const [newCourseDescription, setNewCourseDescription] = useState("");

  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    const solicitarCursos = async () => {
      const respuestaAsesor = await obtenerAsesor();
      const asesor = respuestaAsesor.asesor;
      setAsesor(asesor);
      if (!asesor || !asesor.matriculaasesor) return;

      const respuesta = await mostrarCursosPorMatricula(asesor.matriculaasesor);
      if (respuesta.success) {
        const cursosFormateados = respuesta.cursos.map((curso) => ({
          id: curso.idcurso,
          titulo: curso.titulocurso,
          nombre: curso.nombreasignatura,
          estudiantesInscritos: curso.estudiantesInscritos || 0,
        }));
        setCursos(cursosFormateados);
      }
    };
    solicitarCursos();

    const solicitarAsignaturas = async () => {
      const respuesta = await mostrarAsignaturas();
      if (respuesta.success) {
        console.log("Datos de asignaturas:", respuesta.asignaturas);
      }

      setAsignaturas(respuesta.asignaturas || []);
    };
    solicitarAsignaturas();
  }, []);

  const abrirCurso = async (course) => {
    setSelectedCourse(course);
    const respuesta = await mostrarActividadesPorCurso(course.id);
    if (respuesta.success) {
      setActividades(respuesta.actividades);
    } else {
      setActividades([]);
    }
  };

  const crearCurso = () => {
    setShowCreateCourseModal(true);
  };

  const handleCreateCourse = () => {
    if (newCourseTitle && newCourseSubject) {
      const newCourse = {
        titulo: newCourseTitle,
        descripcion: newCourseDescription,
        asignatura: newCourseSubject,
      };

      // Limpiar los campos de texto del formulario
      setNewCourseTitle("");
      setNewCourseDescription("");

      // Cerrar el modal de creación de curso
      setShowCreateCourseModal(false);

      registrarCurso(
        newCourse.titulo,
        newCourse.descripcion,
        newCourse.asignatura,
        asesor.matriculaasesor
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Gestión de Cursos
      </h1>

      <button
        onClick={crearCurso}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Crear Nuevo Curso
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Mis Cursos</h2>
        <ul className="space-y-4">
          {cursos.map((course) => (
            <li
              key={course.id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {course.titulo}
                </h3>
                <p className="text-gray-600 text-sm">
                  Materia: {course.nombre}
                </p>
                <p className="text-gray-600 text-sm">
                  Estudiantes: {course.estudiantesInscritos}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => abrirCurso(course)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Contenido
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedCourse.titulo}
            </h2>
            <p className="text-gray-700 mb-4">
              Materia: {selectedCourse.nombre}
            </p>
            <p className="text-gray-700 mb-4">
              Estudiantes inscritos: {selectedCourse.estudiantesInscritos}
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Actividades del Curso
            </h3>
            {actividades.length > 0 ? (
              <ul className="space-y-4 mb-6">
                {actividades.map((actividad) => (
                  <li
                    key={actividad.idActividad}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <p className="font-medium text-gray-800">
                      Título: {actividad.tituloActividad}
                    </p>
                    <p className="text-sm text-gray-600">
                      Descripción: {actividad.descripcionActividad}
                    </p>
                    <p className="text-sm text-gray-500">
                      Fecha de entrega:{" "}
                      {new Date(actividad.fechaEntrega).toLocaleDateString(
                        "es-MX",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mb-6">
                Este curso aún no tiene actividades.
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setActividades([]);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Crear Nuevo Curso
            </h2>
            <div className="mb-4">
              <label
                htmlFor="courseTitle"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Título
              </label>
              <input
                type="text"
                id="courseTitle"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Título del curso"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="courseSubject"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Descripción
              </label>
              <input
                type="text"
                id="courseDescription"
                value={newCourseDescription}
                onChange={(e) => setNewCourseDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Descripción del curso"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="courseSubject"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Asignatura
              </label>
              <select
                name=""
                id="courseSubject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                onChange={(e) => setNewCourseSubject(e.target.value)}
              >
                {asignaturas.map((asignatura) => (
                  <option
                    key={asignatura.idasignatura}
                    value={asignatura.idasignatura}
                  >
                    {asignatura.nombreasignatura}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateCourseModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCourse}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Crear Curso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisorCourses;
