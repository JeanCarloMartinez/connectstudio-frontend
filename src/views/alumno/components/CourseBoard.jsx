import React, { useState } from "react";
import { mostrarMaterialesPorCurso } from "./../../../services/material.service";
import { mostrarAnunciosPorCurso } from "./../../../services/anuncio.service";
import { useEffect } from "react"; // Asegúrate de importar useEffect si no lo has hecho

const CourseBoard = ({ advisory, onBackToMyAdvisories }) => {
  // Estado para materiales
  const [materiales, setMateriales] = useState([]);

  // Estado para anuncios
  const [anuncios, setAnuncios] = useState([]);

  console.log("Advisory recibido en CourseBoard:", advisory);
  useEffect(() => {
    if (advisory?.idcourse) {
      mostrarMaterialesPorCurso(advisory.idcourse)
        .then((data) => {
          console.log("📦 Materiales obtenidos del backend:", data);
          setMateriales(data.materiales);
        })
        .catch((err) => {
          console.error("❌ Error al obtener materiales:", err);
        });
    }

    if (advisory?.idcourse) {
      mostrarAnunciosPorCurso(advisory.idcourse)
        .then((data) => {
          console.log("📦 Anuncios obtenidos del backend:", data);
          setAnuncios(data.anuncios);
        })
        .catch((err) => {
          console.error("❌ Error al obtener anuncios:", err);
        });
    }
  }, [advisory?.idcourse]);

  console.log("materiales", materiales);
  console.log("anuncios", anuncios);

  // Mock data para el tablón del curso
  const mockCourseData = {
    1: {
      title: "Cálculo Diferencial e Integral",
      instructor: "Juan Pérez",
      description:
        "Este tablón contiene recursos y discusiones para la asesoría de Cálculo Diferencial e Integral. Aquí encontrarás materiales de apoyo, anuncios importantes y un espacio para preguntas.",
      materials: [
        { id: 1, name: "Apuntes de Derivadas", type: "PDF", url: "#" },
        { id: 2, name: "Ejercicios de Integrales", type: "PDF", url: "#" },
        {
          id: 3,
          name: "Video: Introducción al Cálculo",
          type: "Video",
          url: "#",
        },
      ],
      announcements: [
        {
          id: 1,
          title: "Próxima sesión: Jueves 16:00",
          content:
            "Recuerden que nuestra próxima sesión es este jueves. Traigan sus dudas sobre el tema 3.",
        },
        {
          id: 2,
          title: "Material adicional disponible",
          content:
            "He subido nuevos ejercicios resueltos en la sección de materiales.",
        },
      ],
      discussion: [
        {
          id: 1,
          author: "Estudiante A",
          comment: "Tengo una duda con el ejercicio 5 de la página 20.",
        },
        {
          id: 2,
          author: "Juan Pérez",
          comment:
            "Claro, Estudiante A. Podemos revisarlo al inicio de la próxima sesión.",
        },
      ],
    },
    2: {
      title: "Física Clásica",
      instructor: "María García",
      description:
        "Tablón para la asesoría de Física Clásica. Aquí compartiremos recursos y resolveremos dudas sobre mecánica y electromagnetismo.",
      materials: [
        { id: 1, name: "Leyes de Newton Resumen", type: "PDF", url: "#" },
        {
          id: 2,
          name: "Problemas de Electromagnetismo",
          type: "PDF",
          url: "#",
        },
      ],
      announcements: [
        {
          id: 1,
          title: "Cambio de horario para el viernes",
          content: "La sesión del viernes se moverá a las 11:00 AM.",
        },
      ],
      discussion: [
        {
          id: 1,
          author: "Estudiante B",
          comment: "¿Alguien tiene un buen recurso sobre la Ley de Ohm?",
        },
      ],
    },
    9: {
      title: "Introducción a Python",
      instructor: "Diego López",
      description:
        "Este es el tablón para la asesoría de Introducción a Python. Aquí encontrarás todo lo necesario para empezar a programar.",
      materials: [
        {
          id: 1,
          name: "Guía de Python para Principiantes",
          type: "PDF",
          url: "#",
        },
        {
          id: 2,
          name: "Ejercicios de Estructuras de Datos",
          type: "PDF",
          url: "#",
        },
      ],
      announcements: [
        {
          id: 1,
          title: "Sesión de dudas en vivo",
          content:
            "Tendremos una sesión de preguntas y respuestas en vivo el miércoles.",
        },
      ],
      discussion: [
        {
          id: 1,
          author: "Estudiante C",
          comment: "¿Cuál es la mejor IDE para Python?",
        },
      ],
    },
  };
  const courseId = advisory.idcourse;
  const course = mockCourseData[courseId];
  const [newDiscussionComment, setNewDiscussionComment] = useState("");

  // if (!course) {
  //   return (
  //     <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
  //       <p className="text-gray-600 text-lg">Curso no encontrado.</p>
  //     </div>
  //   );
  // }

  const handleAddComment = () => {
    if (newDiscussionComment.trim()) {
      course.discussion.push({
        id: course.discussion.length + 1,
        author: "Tú", // Simula que el usuario actual es quien comenta
        comment: newDiscussionComment.trim(),
      });
      setNewDiscussionComment("");
      // En un caso real, aquí se enviaría el comentario a un backend
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <button
          onClick={onBackToMyAdvisories}
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
          Volver a Mis Asesorías
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {advisory.subject}
        </h2>
        <p className="text-gray-600 mb-6">
          Instructor: <span className="font-medium">{advisory.name}</span>
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          {advisory.description}
        </p>

        {/* Sección de Materiales */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Materiales del Curso
          </h3>
          {materiales.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* {course.materials.map((material) => (
                <a
                  key={material.id}
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  <svg
                    className="w-6 h-6 mr-3 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {material.type === "PDF" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    )}
                    {material.type === "Video" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    )}
                  </svg>
                  <span className="font-medium text-gray-800">
                    {material.name}
                  </span>
                </a>
              ))} */}

              {materiales.map((material, index) => (
                <a
                  key={material.idmaterial}
                  href={material.rutamaterial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  <svg
                    className="w-6 h-6 mr-3 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* {material.type === "PDF" && ( */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                    {/* )}
                    {material.type === "Video" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    )} */}
                  </svg>
                  <span className="font-medium text-gray-800">
                    {material.titulomaterial}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No hay materiales disponibles aún.</p>
          )}
        </div>

        {/* Sección de Anuncios */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Anuncios
          </h3>
          {anuncios.length > 0 ? (
            <div className="space-y-4">
              {anuncios.map((anuncio) => (
                <div
                  key={anuncio.idanuncio}
                  className="p-4 bg-yellow-50 rounded-xl border border-yellow-200"
                >
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {anuncio.tituloanuncio}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {anuncio.contenidoanuncio}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No hay anuncios recientes.</p>
          )}
        </div>

        {/* Sección de Discusión */}
        {/* <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Tablón de Discusión
          </h3>
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto custom-scrollbar">
            {course.discussion.length > 0 ? (
              course.discussion.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-gray-100 rounded-xl border border-gray-200"
                >
                  <p className="font-semibold text-gray-800">{item.author}</p>
                  <p className="text-gray-700 text-sm">{item.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                Sé el primero en iniciar una discusión.
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <textarea
              value={newDiscussionComment}
              onChange={(e) => setNewDiscussionComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              rows="3"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            ></textarea>
            <button
              onClick={handleAddComment}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold self-start"
            >
              Comentar
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CourseBoard;
