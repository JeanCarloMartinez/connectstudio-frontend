import React from 'react';

const HomeDashboard = ({ onNavigate }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Bienvenido a Connect Studio</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Conecta con compañeros para recibir y ofrecer apoyo académico. ¡Juntos, el aprendizaje es más fácil!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Encuentra Asesorías</h3>
            <p className="text-gray-600 mb-4">
              Busca compañeros que puedan ayudarte en las materias que te cuestan trabajo.
            </p>
            <button
              onClick={() => onNavigate('advisories')}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold" // Color principal cambiado
            >
              Buscar Asesorías
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Ofrece tu Ayuda</h3>
            <p className="text-gray-600 mb-4">
              Comparte tus conocimientos y ayuda a otros estudiantes a superar sus desafíos.
            </p>
            <button
              onClick={() => onNavigate('materias')}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
            >
              Ver Materias
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Tu Perfil</h3>
            <p className="text-gray-600 mb-4">
              Gestiona tus materias, disponibilidad y solicitudes de asesoría.
            </p>
            <button
              onClick={() => onNavigate('profile')}
              className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
            >
              Ver mi Perfil
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Testimonios de Éxito</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <p className="text-gray-700 italic mb-3">
                "Gracias a Connect Studio, pude entender cálculo. ¡Mi compañero fue un crack explicando!"
              </p>
              <p className="text-gray-800 font-medium">- Ana G., Ingeniería</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <p className="text-gray-700 italic mb-3">
                "Ofrecer asesorías me ayudó a repasar y consolidar mis conocimientos. ¡Excelente iniciativa!"
              </p>
              <p className="text-gray-800 font-medium">- Luis P., Contaduría</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;