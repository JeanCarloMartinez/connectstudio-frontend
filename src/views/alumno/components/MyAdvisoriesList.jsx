// Importar useState y useEffect
import { useState, useEffect } from "react";
// Importar funciones del servicio inscripciones
import { mostrarInscripcionesPorMatriculaAlumno } from "./../../../services/inscripcion.service";
// Importar funciones del servicio alumno
import { obtenerAlumno } from "./../../../services/alumno.service";
// Importar funciones dle servicio materiales
import { mostrarMaterialesPorCurso } from "./../../../services/material.service";

const MyAdvisoriesList = ({ onNavigate, onGoToCourseBoard }) => {
  // Declarar variables useState similar a getters y setters
  const [inscripciones, setInscripciones] = useState([]);

  // Al cargar la pagina por primera vez, se ejecuta esta funcion
  useEffect(() => {
    // Funcion que solicita las inscripciones al servidor
    const solicitarInscripciones = async () => {
      // Obtener dinamicamente los datos del alumno
      const respuestaAlumno = await obtenerAlumno();
      // Guardar los datos del alumno en una variable
      const alumno = respuestaAlumno.alumno;

      // Validar si hay alumno y tiene matrícula
      if (!alumno || !alumno.matriculaalumno) {
        console.warn("No se encontró el alumno o su matrícula.");
        return;
      }

      // Ejecutar la funcion pasando como parametro la matricula del alumno
      const respuesta = await mostrarInscripcionesPorMatriculaAlumno(
        alumno.matriculaalumno
      );

      console.log("Res: ", respuesta);
      // console.log("Datos recibidos: ", respuesta.inscripciones);

      // Validar si la respuesta fue exitosa
      if (respuesta.success) {
        // Mapear los datos para que se usen las propiedades del frontend
        const InscripcionesFormateadas = respuesta.inscripciones.map(
          (inscripcion, index) => {
            return {
              id: inscripcion.idcurso,
              name: inscripcion.nombrecompletousuario || "Asesor sin nombre",
              subject: inscripcion.nombreasignatura || "Asignatura desconocida",
              date: inscripcion.fechaasesoria || "Sin fecha",
              time: inscripcion.horainicioasesoria || "Sin hora",
              description: inscripcion.descripcioncurso || "Sin descripción",
              courseId: inscripcion.idcurso,
              status: "Próxima", // o calcula dinámicamente si quieres
              idcourse: inscripcion.idcurso,
            };
          }
        );

        console.log("Inscripciones formateadas: ", InscripcionesFormateadas);

        // Agregar el nuevo valor a eventos
        setInscripciones(InscripcionesFormateadas);
      }
    }; // Fin de la funcion solicitarInscripciones

    // Ejecutar la funcion solicitarInscripciones
    solicitarInscripciones();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Próxima":
        return "bg-indigo-100 text-indigo-800";
      case "Completada":
        return "bg-emerald-100 text-emerald-800";
      case "Cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Mis Asesorías Inscritas
        </h2>

        {inscripciones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inscripciones.map((advisory) => (
              <div
                key={advisory.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {advisory.subject}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      advisory.status
                    )}`}
                  >
                    {advisory.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-1">
                  Con: <span className="font-medium">{advisory.name}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  Fecha: <span className="font-medium">{advisory.date}</span>
                </p>
                <p className="text-gray-600 mb-3">
                  Hora: <span className="font-medium">{advisory.time}</span>
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  {advisory.description}
                </p>

                <div className="flex justify-end space-x-3">
                  {advisory.status === "Próxima" && (
                    <button
                      // onClick={() => onGoToCourseBoard(advisory.courseId)}
                      onClick={() => {
                        console.log(
                          "Enviando advisory a CourseBoard:",
                          advisory
                        );
                        onGoToCourseBoard(advisory);
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold text-sm"
                    >
                      Ir a la Sala
                    </button>
                  )}
                  <button
                    onClick={() => alert(`Ver detalles de ${advisory.subject}`)}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-semibold text-sm"
                  >
                    Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg text-center">
            Aún no estás inscrito en ninguna asesoría.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAdvisoriesList;
