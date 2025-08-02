import React from 'react';

const AdvisorDashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard de Connect Studio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cursos Activos</h2>
          <p className="text-4xl font-bold text-blue-600">7</p>
          <p className="text-gray-500 mt-2">Cursos disponibles</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Asesorías Activas</h2>
          <p className="text-4xl font-bold text-green-600">3</p>
          <p className="text-gray-500 mt-2">Asesorías en curso</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Alumnos Totales</h2>
          <p className="text-4xl font-bold text-purple-600">45</p>
          <p className="text-gray-500 mt-2">Alumnos inscritos</p>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximas Asesorías</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Matemáticas Avanzadas</p>
              <p className="text-sm text-gray-500">Miércoles, 10:00 AM</p>
            </div>
            <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
              5 Alumnos
            </span>
          </li>
          <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Programación Web</p>
              <p className="text-sm text-gray-500">Jueves, 03:00 PM</p>
            </div>
            <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              8 Alumnos
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvisorDashboard;