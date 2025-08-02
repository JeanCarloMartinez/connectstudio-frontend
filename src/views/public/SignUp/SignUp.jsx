import React, { useState } from 'react';
import AuthRegisterForm from './components/AuthRegisterForm';

function App() {
  const [currentPage, setCurrentPage] = useState('register'); // 'register', 'dashboardUser', 'dashboardAdvisor'

  const handleRegisterSuccess = (userType) => {
    if (userType === 'user') {
      setCurrentPage('dashboardUser');
    } else if (userType === 'advisor') {
      setCurrentPage('dashboardAdvisor');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <AuthRegisterForm onRegisterSuccess={handleRegisterSuccess} />;
      case 'dashboardUser':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="p-8 bg-white rounded-2xl shadow-2xl text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">¡Bienvenido, Usuario!</h2>
              <p className="text-gray-700 text-lg">Tu dashboard de usuario está listo. ¡Aprende mucho!</p>
              <button
                onClick={() => setCurrentPage('register')}
                className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg transform hover:scale-105"
              >
                Volver al Registro
              </button>
            </div>
          </div>
        );
      case 'dashboardAdvisor':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4">
            <div className="p-8 bg-white rounded-2xl shadow-2xl text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">¡Bienvenido, Asesor!</h2>
              <p className="text-gray-700 text-lg">Tu dashboard de asesor está listo. ¡A enseñar se ha dicho!</p>
              <button
                onClick={() => setCurrentPage('register')}
                className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg transform hover:scale-105"
              >
                Volver al Registro
              </button>
            </div>
          </div>
        );
      default:
        return <AuthRegisterForm onRegisterSuccess={handleRegisterSuccess} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {renderPage()}
    </div>
  );
}

export default App;