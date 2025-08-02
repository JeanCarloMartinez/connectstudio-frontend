import React, { useState } from 'react';

const AdvisorProfile = () => {
  const [advisor, setAdvisor] = useState({
    name: 'Dr. Juan Pérez',
    title: 'Asesor Senior de Matemáticas y Programación',
    bio: 'Con más de 15 años de experiencia en la enseñanza y desarrollo de software, el Dr. Juan Pérez es un apasionado por la educación y la tecnología. Ha impartido cursos en diversas universidades y ha liderado proyectos de desarrollo en empresas de renombre. Su enfoque se centra en hacer que conceptos complejos sean accesibles y aplicables para todos sus alumnos.',
    email: 'juan.perez@connectstudio.com',
    phone: '+52 55 1234 5678',
    specialties: ['Cálculo Avanzado', 'Álgebra Lineal', 'React.js', 'Node.js', 'Bases de Datos'],
    profilePicture: null, // Nueva propiedad para la foto de perfil
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(advisor.name);
  const [editTitle, setEditTitle] = useState(advisor.title);
  const [editBio, setEditBio] = useState(advisor.bio);
  const [editEmail, setEditEmail] = useState(advisor.email);
  const [editPhone, setEditPhone] = useState(advisor.phone);
  const [editProfilePicture, setEditProfilePicture] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setEditProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSaveProfile = () => {
    setAdvisor({
      ...advisor,
      name: editName,
      title: editTitle,
      bio: editBio,
      email: editEmail,
      phone: editPhone,
      profilePicture: editProfilePicture || advisor.profilePicture,
    });
    setShowEditModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Perfil del Asesor</h1>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-5xl font-bold mb-4 md:mb-0 md:mr-6 overflow-hidden">
            {advisor.profilePicture ? (
              <img src={advisor.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              advisor.name.charAt(0)
            )}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">{advisor.name}</h2>
            <p className="text-xl text-blue-600 font-medium mt-1">{advisor.title}</p>
            <p className="text-gray-600 mt-3 max-w-prose">{advisor.bio}</p>
            <button
              onClick={() => setShowEditModal(true)}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center mx-auto md:mx-0"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Editar Perfil
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Información de Contacto</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {advisor.email}
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 9.87a1 1 0 00.54 1.107l7.5 4a1 1 0 001.107.54l.684-.948A1 1 0 0121 16.72V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                {advisor.phone}
              </li>
            </ul>
          </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Perfil</h2>
            <div className="mb-4">
              <label htmlFor="editName" className="block text-gray-700 text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editTitle" className="block text-gray-700 text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                id="editTitle"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editBio" className="block text-gray-700 text-sm font-medium mb-2">Biografía</label>
              <textarea
                id="editBio"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="editEmail" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="editEmail"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editPhone" className="block text-gray-700 text-sm font-medium mb-2">Teléfono</label>
              <input
                type="tel"
                id="editPhone"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="profilePicture" className="block text-gray-700 text-sm font-medium mb-2">Foto de Perfil</label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {editProfilePicture && (
                <div className="mt-4 flex items-center space-x-3">
                  <img src={editProfilePicture} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-gray-200" />
                  <p className="text-sm text-gray-500">Previsualización de la foto</p>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

export default AdvisorProfile;