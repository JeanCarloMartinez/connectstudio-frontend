import React, { useState, useEffect } from "react";
import {
  mostrarCursosPorMatricula,
  registrarCurso,
} from "../../../services/curso.service";
import { obtenerAsesor } from "../../../services/asesor.service";
import { mostrarAsignaturas } from "../../../services/asignatura.service";
import { subirMaterialPdf } from "../../../services/material.service"; // ajusta la ruta
import Swal from "sweetalert2";

const AdvisorCourses = () => {
  const [cursos, setCursos] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseSubject, setNewCourseSubject] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [asignaturas, setAsignaturas] = useState([]);
  const [asesor, setAsesor] = useState(null);

  // Estados para material
  const [showUploadMaterialModal, setShowUploadMaterialModal] = useState(false);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialFile, setMaterialFile] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuestaAsesor = await obtenerAsesor();
        const asesorData = respuestaAsesor.asesor;
        setAsesor(asesorData);

        if (!asesorData?.matriculaasesor) return;

        const respuestaCursos = await mostrarCursosPorMatricula(
          asesorData.matriculaasesor
        );
        if (respuestaCursos.success) {
          const cursosFormateados = respuestaCursos.cursos.map((curso) => ({
            id: curso.idcurso,
            titulo: curso.titulocurso,
            nombre: curso.nombreasignatura,
            estudiantesInscritos: curso.estudiantesInscritos || 0,
          }));
          setCursos(cursosFormateados);
        }

        const respuestaAsignaturas = await mostrarAsignaturas();
        if (respuestaAsignaturas.success) {
          setAsignaturas(respuestaAsignaturas.asignaturas || []);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const abrirCurso = (course) => {
    setSelectedCourse(course);
    // Aquí puedes cargar actividades si lo deseas
  };

  const handleCreateCourse = async () => {
    if (!newCourseTitle || !newCourseSubject) {
      Swal.fire("Error", "Por favor completa los campos requeridos", "warning");
      return;
    }

    try {
      await registrarCurso(
        newCourseTitle,
        newCourseDescription,
        newCourseSubject,
        asesor.matriculaasesor
      );
      Swal.fire("¡Éxito!", "Curso creado correctamente", "success");
      setShowCreateCourseModal(false);
      setNewCourseTitle("");
      setNewCourseDescription("");
      setNewCourseSubject("");
      // Refrescar cursos
      const respuestaCursos = await mostrarCursosPorMatricula(
        asesor.matriculaasesor
      );
      if (respuestaCursos.success) {
        setCursos(
          respuestaCursos.cursos.map((curso) => ({
            id: curso.idcurso,
            titulo: curso.titulocurso,
            nombre: curso.nombreasignatura,
            estudiantesInscritos: curso.estudiantesInscritos || 0,
          }))
        );
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el curso", "error");
      console.error(error);
    }
  };

  const handleUploadMaterial = async (e) => {
    e.preventDefault();

    if (!materialTitle || !materialFile || !selectedCourse) {
      Swal.fire(
        "Error",
        "Completa todos los campos para subir el material",
        "warning"
      );
      return;
    }

    try {
      const respuesta = await subirMaterialPdf({
        file: materialFile,
        tituloMaterial: materialTitle,
        idCurso: selectedCourse.id,
      });

      if (respuesta.success) {
        Swal.fire("¡Éxito!", "Material subido correctamente", "success");
        setShowUploadMaterialModal(false);
        setMaterialTitle("");
        setMaterialFile(null);
        // Aquí puedes recargar materiales si tienes función para eso
      } else {
        Swal.fire(
          "Error",
          respuesta.mensaje || "No se pudo subir el material",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", "Error al subir el material", "error");
      console.error(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Gestión de Cursos
      </h1>

      <button
        onClick={() => setShowCreateCourseModal(true)}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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

      {/* Modal Ver Curso */}
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

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowUploadMaterialModal(true)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Subir Material
              </button>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  // Puedes limpiar otras cosas si deseas
                }}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Crear Curso */}
      {showCreateCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Crear Nuevo Curso
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Título
              </label>
              <input
                type="text"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Título del curso"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Descripción
              </label>
              <input
                type="text"
                value={newCourseDescription}
                onChange={(e) => setNewCourseDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción del curso"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Asignatura
              </label>
              <select
                value={newCourseSubject}
                onChange={(e) => setNewCourseSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una asignatura</option>
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
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCourse}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Crear Curso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Subir Material */}
      {showUploadMaterialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Subir Material
            </h2>
            <form onSubmit={handleUploadMaterial}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Título del material
                </label>
                <input
                  type="text"
                  value={materialTitle}
                  onChange={(e) => setMaterialTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Ej. Guía de repaso"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Archivo PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setMaterialFile(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadMaterialModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Subir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisorCourses;
