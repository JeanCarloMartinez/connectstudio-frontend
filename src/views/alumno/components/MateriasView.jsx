import React, { useState } from "react";

// Simulación de materias y actividades
const materiasEjemplo = [
  {
    id: 1,
    nombre: "Matemáticas Avanzadas",
    actividades: [
      { id: 101, titulo: "Tarea 1: Derivadas", fecha: "2024-08-10", estado: "Entregada" },
      { id: 102, titulo: "Proyecto: Integrales", fecha: "2024-08-20", estado: "Pendiente" },
    ],
  },
  {
    id: 2,
    nombre: "Programación Web",
    actividades: [
      { id: 201, titulo: "Práctica: React Básico", fecha: "2024-08-12", estado: "Pendiente" },
      { id: 202, titulo: "Examen Parcial", fecha: "2024-08-18", estado: "Pendiente" },
    ],
  },
];

const MateriasView = () => {
  const [materias] = useState(materiasEjemplo);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mis Materias y Actividades</h2>
      {!materiaSeleccionada ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materias.map((mat) => (
            <div
              key={mat.id}
              className="bg-white rounded-xl shadow p-6 border border-gray-200 hover:shadow-lg cursor-pointer transition"
              onClick={() => setMateriaSeleccionada(mat)}
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{mat.nombre}</h3>
              <p className="text-gray-500">Actividades: {mat.actividades.length}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <button
            className="mb-4 text-indigo-600 hover:underline font-semibold"
            onClick={() => setMateriaSeleccionada(null)}
          >
            ← Volver a Materias
          </button>
          <h3 className="text-2xl font-bold text-blue-700 mb-4">{materiaSeleccionada.nombre}</h3>
          <ul className="space-y-4">
            {materiaSeleccionada.actividades.map((act) => (
              <li key={act.id} className="p-4 bg-blue-50 rounded border flex justify-between items-center">
                <div>
                  <p className="font-semibold">{act.titulo}</p>
                  <p className="text-sm text-gray-500">Fecha de entrega: {act.fecha}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${act.estado === "Entregada" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                  {act.estado}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MateriasView;
