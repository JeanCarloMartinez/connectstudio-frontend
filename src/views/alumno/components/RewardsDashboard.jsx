import React from 'react';

const RewardsDashboard = ({ onNavigate }) => {
  const badges = [
    { id: 1, name: 'Primer Asesorado', description: 'Completa tu primera asesoría como tutor.', icon: '⭐', earned: true },
    { id: 2, name: 'Estudiante Estrella', description: 'Recibe 5 calificaciones de 5 estrellas.', icon: '🌟', earned: false },
    { id: 3, name: 'Ayudante Pro', description: 'Ofrece 10 asesorías exitosas.', icon: '🎓', earned: true },
    { id: 4, name: 'Maestro de Materia', description: 'Ofrece asesorías en 3 materias diferentes.', icon: '📚', earned: false },
    { id: 5, name: 'Agenda Perfecta', description: 'Mantén tu agenda sin pendientes por un mes.', icon: '🗓️', earned: true },
    { id: 6, name: 'Comunicador', description: 'Envía 50 mensajes en la plataforma.', icon: '💬', earned: false },
  ];

  const rewards = [
    { id: 1, name: 'Descuento en libros', description: '10% de descuento en librerías asociadas.', points: 500, redeemed: false },
    { id: 2, name: 'Acceso a cursos premium', description: 'Acceso gratuito a un curso online de tu elección.', points: 1000, redeemed: false },
    { id: 3, name: 'Mentoría personalizada', description: 'Una sesión de mentoría con un profesional de tu área.', points: 2000, redeemed: true },
  ];

  const currentPoints = 750; // Ejemplo de puntos del usuario

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mis Recompensas y Logros</h2>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tus Puntos Actuales: <span className="text-indigo-600">{currentPoints}</span></h3> {/* Color principal cambiado */}
          <p className="text-gray-600">Gana puntos ofreciendo y recibiendo asesorías, y completando actividades en tu agenda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Insignias */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Insignias Obtenidas</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {badges.map(badge => (
                <div key={badge.id} className={`p-4 rounded-xl text-center ${badge.earned ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-100 border-gray-200 opacity-60'} transition-all duration-300`}>
                  <span className="text-4xl block mb-2">{badge.icon}</span>
                  <h4 className="font-semibold text-gray-800">{badge.name}</h4>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recompensas */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recompensas Disponibles</h3>
            <div className="space-y-4">
              {rewards.map(reward => (
                <div key={reward.id} className={`p-4 rounded-xl border ${reward.redeemed ? 'bg-emerald-100 border-emerald-300' : 'bg-indigo-50 border-indigo-200'} flex items-center justify-between`}> {/* Colores cambiados */}
                  <div>
                    <h4 className="font-semibold text-gray-800">{reward.name}</h4>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                    <p className="text-sm font-bold text-indigo-600 mt-1">{reward.points} Puntos</p> {/* Color principal cambiado */}
                  </div>
                  {reward.redeemed ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-semibold">Canjeado</span> // Color secundario cambiado
                  ) : (
                    <button
                      onClick={() => alert(`Intentando canjear ${reward.name}`)}
                      disabled={currentPoints < reward.points}
                      className={`px-4 py-2 rounded-xl text-white font-semibold transition-colors ${
                        currentPoints >= reward.points ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed' // Color principal cambiado
                      }`}
                    >
                      Canjear
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsDashboard;