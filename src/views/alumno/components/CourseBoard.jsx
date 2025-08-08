import React, { useState, useEffect } from "react";
import { mostrarMaterialesPorCurso } from "./../../../services/material.service";
import { mostrarAnunciosPorCurso } from "./../../../services/anuncio.service";
import {
  mostrarComentariosPorCurso,
  registrarComentario,
} from "./../../../services/comentariocurso.service";

const CourseBoard = ({ advisory, onBackToMyAdvisories }) => {
  const [materiales, setMateriales] = useState([]);
  const [anuncios, setAnuncios] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [newDiscussionComment, setNewDiscussionComment] = useState("");

  // ⚠️ Reemplaza esto con el ID real del usuario si lo tienes disponible
  const idUsuarioActual = localStorage.getItem("idusuario");

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

      mostrarAnunciosPorCurso(advisory.idcourse)
        .then((data) => {
          console.log("📦 Anuncios obtenidos del backend:", data);
          setAnuncios(data.anuncios);
        })
        .catch((err) => {
          console.error("❌ Error al obtener anuncios:", err);
        });

      mostrarComentariosPorCurso(advisory.idcourse)
        .then((data) => {
          console.log("📦 Comentarios obtenidos del backend:", data);
          setComentarios(data.comentarios);
        })
        .catch((err) => {
          console.error("❌ Error al obtener comentarios:", err);
        });
    }
  }, [advisory?.idcourse]);

  const handleAddComment = async () => {
    if (!newDiscussionComment.trim()) return;

    const res = await registrarComentario(
      newDiscussionComment,
      advisory.idcourse,
      idUsuarioActual
    );

    if (res.success) {
      // Volver a cargar comentarios
      const data = await mostrarComentariosPorCurso(advisory.idcourse);
      setComentarios(data.comentarios);
      setNewDiscussionComment("");
    } else {
      alert("Error al registrar comentario: " + res.mensaje);
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
              {materiales.map((material) => (
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
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
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Tablón de Discusión
          </h3>
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto custom-scrollbar">
            {comentarios.length > 0 ? (
              comentarios.map((item) => (
                <div
                  key={item.idcomentario}
                  className="p-4 bg-gray-100 rounded-xl border border-gray-200"
                >
                  <p className="font-semibold text-gray-800">
                    {item.nombreusuario || "Usuario"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {item.contenidocomentario}
                  </p>
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
        </div>
      </div>
    </div>
  );
};

export default CourseBoard;
