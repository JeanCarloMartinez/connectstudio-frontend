import React from 'react';

const AdvisorWelcome = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">¡Bienvenido a Connect Studio!</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Tu plataforma personalizada para gestionar cursos, asesorías y tu perfil profesional.
        Explora las opciones en el menú lateral para empezar.
      </p>
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
          Ver Dashboard
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200">
          Crear Curso
        </button>
      </div>
    </div>
  );
};

export default AdvisorWelcome;