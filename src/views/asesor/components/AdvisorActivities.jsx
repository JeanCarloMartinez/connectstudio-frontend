import React, { useState } from 'react';

const AdvisorActivities = () => {
  const [activities, setActivities] = useState([
    { id: 1, title: 'Ensayo sobre IA', description: 'Análisis de impacto de la IA en la sociedad.', files: [], status: 'Pendiente' },
    { id: 2, title: 'Problemas de Cálculo', description: 'Resolver ejercicios del capítulo 3.', files: [{ name: 'ejercicios.pdf', url: '#' }], status: 'Revisado' },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityDescription, setNewActivityDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreateActivity = () => {
    if (newActivityTitle && newActivityDescription) {
      const newActivity = {
        id: activities.length + 1,
        title: newActivityTitle,
        description: newActivityDescription,
        files: selectedFile ? [{ name: selectedFile.name, url: URL.createObjectURL(selectedFile) }] : [],
        status: 'Pendiente',
      };
      setActivities([...activities, newActivity]);
      setNewActivityTitle('');
      setNewActivityDescription('');
      setSelectedFile(null);
      setShowCreateModal(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = (activityId) => {
    // Lógica para subir archivo a una actividad existente
    alert(`Subir archivo para actividad ${activityId}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestión de Actividades</h1>
      <button
        onClick={() => setShowCreateModal(true)}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Crear Nueva Actividad
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Mis Actividades</h2>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activity.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {activity.status}
                </span>
              </div>
              {activity.files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Archivos adjuntos:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {activity.files.map((file, index) => (
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleUploadFile(activity.id)}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Subir Archivo
                </button>
                <button
                  onClick={() => alert(`Editar actividad ${activity.id}`)}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Nueva Actividad</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                id="title"
                value={newActivityTitle}
                onChange={(e) => setNewActivityTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Título de la actividad"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Descripción</label>
              <textarea
                id="description"
                value={newActivityDescription}
                onChange={(e) => setNewActivityDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                placeholder="Descripción detallada de la actividad"
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="file" className="block text-gray-700 text-sm font-medium mb-2">Adjuntar Archivo (Opcional)</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {selectedFile && <p className="mt-2 text-sm text-gray-500">Archivo seleccionado: {selectedFile.name}</p>}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateActivity}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Crear Actividad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisorActivities;