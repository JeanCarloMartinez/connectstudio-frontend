import React from 'react';

const StudentProfileView = ({ student, onNavigate }) => {
  if (!student) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No se ha seleccionado ningún perfil de estudiante.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <button
          onClick={() => onNavigate('advisories')} // O a la página anterior si se viene de una lista
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-semibold" // Color principal cambiado
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-5xl font-bold mb-4 overflow-hidden">
            {/* Placeholder para imagen de perfil */}
            {student.profileImage ? (
              <img src={student.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            )}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">{student.name}</h3>
          <p className="text-gray-600">{student.level}</p>
        </div>

        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-3">Acerca de {student.name}</h4>
          <p className="text-gray-700 leading-relaxed">{student.bio}</p>
        </div>

        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-3">Materias en las que ofrece asesoría</h4>
          <div className="flex flex-wrap gap-3">
            {student.subjects.map((subject, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full"> {/* Color principal cambiado */}
                {subject}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-3">Calificación promedio</h4>
          <div className="flex items-center text-yellow-500">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-gray-700 font-semibold text-xl">{student.rating}</span>
          </div>
        </div>

        <button
          onClick={() => alert(`Enviando mensaje a ${student.name}`)}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold" // Color principal cambiado
        >
          Enviar Mensaje
        </button>
      </div>
    </div>
  );
};

export default StudentProfileView;