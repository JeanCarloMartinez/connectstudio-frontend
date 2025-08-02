import React, { useState } from 'react';

export default function AdvisorAdvisories() {
  const [advisories, setAdvisories] = useState([
    {
      id: 1,
      title: 'Asesoría de Matemáticas Avanzadas',
      description: 'Sesiones de apoyo para cálculo diferencial e integral.',
      date: '2024-08-15',
      students: [
        { id: 101, name: 'Ana García', email: 'ana.g@example.com' },
        { id: 102, name: 'Luis Pérez', email: 'luis.p@example.com' },
        { id: 103, name: 'Sofía Ramírez', email: 'sofia.r@example.com' },
      ],
    },
    {
      id: 2,
      title: 'Asesoría de Programación Web',
      description: 'Introducción a React y desarrollo frontend.',
      date: '2024-08-20',
      students: [
        { id: 201, name: 'Carlos Sánchez', email: 'carlos.s@example.com' },
        { id: 202, name: 'María López', email: 'maria.l@example.com' },
      ],
    },
  ]);

  const [selectedAdvisory, setSelectedAdvisory] = useState(null);
  const [showCreateAdvisoryModal, setShowCreateAdvisoryModal] = useState(false);
  const [newAdvisoryTitle, setNewAdvisoryTitle] = useState('');
  const [newAdvisoryDescription, setNewAdvisoryDescription] = useState('');
  const [newAdvisoryDate, setNewAdvisoryDate] = useState('');

  const handleCreateAdvisory = () => {
    if (newAdvisoryTitle && newAdvisoryDescription && newAdvisoryDate) {
      const newAdvisory = {
        id: advisories.length + 1,
        title: newAdvisoryTitle,
        description: newAdvisoryDescription,
        date: newAdvisoryDate,
        students: [],
      };
      setAdvisories([...advisories, newAdvisory]);
      setShowCreateAdvisoryModal(false);
      setNewAdvisoryTitle('');
      setNewAdvisoryDescription('');
      setNewAdvisoryDate('');
    }
  };

  const handleDeleteAdvisory = (id) => {
    setAdvisories(advisories.filter((a) => a.id !== id));
    if (selectedAdvisory && selectedAdvisory.id === id) setSelectedAdvisory(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Mis Asesorías</h1>
      <button
        onClick={() => setShowCreateAdvisoryModal(true)}
        className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Crear Nueva Asesoría
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Asesorías</h2>
        <ul className="space-y-4">
          {advisories.map((advisory) => (
            <li key={advisory.id} className="p-4 bg-gray-50 rounded-lg border flex justify-between items-center">
              <div>
                <h3
                  onClick={() => setSelectedAdvisory(advisory)}
                  className="text-lg font-semibold text-blue-700 cursor-pointer hover:underline"
                >
                  {advisory.title}
                </h3>
                <p className="text-gray-600 text-sm">{advisory.description}</p>
                <p className="text-gray-500 text-xs mt-1">Fecha: {advisory.date}</p>
              </div>
              <button
                onClick={() => handleDeleteAdvisory(advisory.id)}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para vista classroom */}
      {selectedAdvisory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl overflow-y-auto max-h-[90vh] w-full max-w-4xl p-6">
            <AdvisoryClassroomView
              advisory={selectedAdvisory}
              onBack={() => setSelectedAdvisory(null)}
            />
          </div>
        </div>
      )}

      {/* Modal para crear asesoría */}
      {showCreateAdvisoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Crear Nueva Asesoría</h2>
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Título"
              value={newAdvisoryTitle}
              onChange={(e) => setNewAdvisoryTitle(e.target.value)}
            />
            <textarea
              className="w-full mb-3 p-2 border rounded"
              placeholder="Descripción"
              value={newAdvisoryDescription}
              onChange={(e) => setNewAdvisoryDescription(e.target.value)}
            />
            <input
              type="date"
              className="w-full mb-6 p-2 border rounded"
              value={newAdvisoryDate}
              onChange={(e) => setNewAdvisoryDate(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreateAdvisoryModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateAdvisory}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Crear Asesoría
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- COMPONENTE ClassroomView ---
function AdvisoryClassroomView({ advisory, onBack }) {
  const [activities, setActivities] = useState([]);
const [newActivityTitle, setNewActivityTitle] = useState('');
const [newActivityDesc, setNewActivityDesc] = useState('');


    const handleAddActivity = () => {
    if (!newActivityTitle.trim()) return;

    const nuevaActividad = { id: Date.now(), title: newActivityTitle, description: newActivityDesc };

    setActivities([...activities, nuevaActividad]);
    setNewActivityTitle('');
    setNewActivityDesc('');

    // ✅ Agrega también dentro de advisory.activities, respetando el original
    advisory.activities = advisory.activities ? [...advisory.activities, nuevaActividad] : [nuevaActividad];
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      {/* Botón regresar */}
      <button onClick={onBack} className="mb-4 flex items-center text-indigo-700 hover:text-indigo-900 font-semibold">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Regresar a Mis Asesorías
      </button>

      {/* Banner */}
      <div
        className="relative text-white rounded-xl overflow-hidden shadow mb-6 h-48 flex items-center justify-between px-6"
        style={{
          background: backgroundImage
            ? `url(${backgroundImage}) center/cover no-repeat`
            : "linear-gradient(to right, #3b82f6, #6366f1)"
        }}
      >
        <div>
          <h2 className="text-3xl font-semibold">{advisory.title}</h2>
          <p>{advisory.description}</p>
        </div>
        <label className="bg-white text-blue-700 px-3 py-1 rounded shadow cursor-pointer text-sm">
          Personalizar
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            if (file) setBackgroundImage(URL.createObjectURL(file));
          }} className="hidden" />
        </label>
      </div>

      {/* Crear actividad */}
{/* Crear actividad */}
<div className="bg-white p-6 rounded-xl shadow mb-6 space-y-4">
  <h3 className="text-xl font-semibold mb-2">Nueva Actividad o Tarea</h3>

  {/* Título */}
  <input
    className="w-full p-2 border rounded text-sm"
    placeholder="Título *"
    value={newActivityTitle}
    onChange={(e) => setNewActivityTitle(e.target.value)}
  />

  {/* Instrucciones */}
  <textarea
    className="w-full p-2 border rounded text-sm"
    placeholder="Instrucciones (opcional)"
    value={newActivityDesc}
    onChange={(e) => setNewActivityDesc(e.target.value)}
  />

  {/* Puntos */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Puntos</label>
    <select className="w-full p-2 border rounded text-sm">
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="10">10</option>
      <option value="0">Sin calificación</option>
    </select>
  </div>

  {/* Fecha de entrega */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de entrega</label>
    <input type="date" className="w-full p-2 border rounded text-sm" />
  </div>

  {/* Tema */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
    <input type="text" className="w-full p-2 border rounded text-sm" placeholder="Ej. Álgebra, React, HTML..." />
  </div>

  {/* Adjuntar archivos */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Adjuntar archivos</label>
    <input type="file" className="w-full text-sm" multiple />
  </div>

  <div className="flex justify-end">
    <button
      onClick={handleAddActivity}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
    >
      Crear Actividad
    </button>
  </div>
</div>

      {/* Lista actividades */}
      {activities.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <h3 className="font-semibold mb-2">Actividades</h3>
          <ul className="space-y-4">
            {activities.map((act, idx) => (
              <li key={act.id} className="p-2 bg-blue-50 rounded border">
                <p className="font-semibold">{act.title}: {act.description}</p>

                {/* Entregas */}
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium">Entregas de alumnos:</p>
                  {act.entregas && act.entregas.map((entrega, entregaIdx) => (
                    <div key={entrega.studentId} className="flex items-center space-x-2">
                      <span className="text-xs">{entrega.studentName}:</span>
                      {entrega.file ? (
                        <a href={URL.createObjectURL(entrega.file)} target="_blank" rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs">Ver archivo</a>
                      ) : (
                        <span className="text-gray-500 text-xs">No ha entregado</span>
                      )}
                      <input
                        type="file"
                        accept="*/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setActivities(prevActivities => {
                            const updated = [...prevActivities];
                            updated[idx].entregas[entregaIdx].file = file;
                            return updated;
                          });
                        }}
                        className="text-xs"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- EXPORTS ---
// (default export already declared above)