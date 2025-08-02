// Importar useState y useEffect
import { useState, useEffect } from "react";
// Importas funciones del servicio inscripciones
import { registrarInscripcion } from "./../../../services/inscripcion.service";
// Importas funciones del servicio alumnos
import { obtenerAlumno } from "./../../../services/alumno.service";

const AdvisoryDetail = ({ advisory, onBackToList, onJoinAdvisory }) => {
  // Declarar variables useState similar a getters y setters
  const [matriculaAlumno, setMatriculaAlumno] = useState("");

  useEffect(() => {
    const cargarAlumno = async () => {
      const respuesta = await obtenerAlumno();
      if (respuesta.success) {
        setMatriculaAlumno(respuesta.alumno.matriculaAlumno);
      }
    };

    cargarAlumno();
  }, []);

  const inscribirAlumnoCurso = async () => {
    if (!matriculaAlumno) {
      alert("⚠️ No se pudo obtener la matrícula del alumno.");
      return;
    }

    const inscripcion = {
      matricula: matriculaAlumno,
      idCurso: advisory.id,
    };

    const res = await registrarInscripcion(inscripcion);

    if (res.success) {
      alert("✅ Inscripción exitosa.");
      onBackToList();
    } else {
      alert("❌ Error al inscribirse: " + res.mensaje);
    }
  };

  if (!advisory) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          No se ha seleccionado ninguna asesoría.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <button
          onClick={onBackToList}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-semibold"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Volver a la lista
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {advisory.subject} con {advisory.nombreCompleto}
        </h2>

        <div className="flex items-center text-yellow-500 mb-6">
          <svg
            className="w-6 h-6 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
          </svg>
          <span className="text-gray-700 font-semibold text-xl">
            {advisory.rating}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Descripción de la Asesoría
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {advisory.description}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Detalles del Asesor
          </h3>
          <p className="text-gray-700">
            <strong>Nombre:</strong> {advisory.nombreCompleto}
          </p>
        </div>

        <button
          onClick={inscribirAlumnoCurso}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 transition-colors font-semibold text-xl"
        >
          Unirme a esta Asesoría
        </button>
      </div>
    </div>
  );
};

export default AdvisoryDetail;
