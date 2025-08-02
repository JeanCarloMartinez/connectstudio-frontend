import React from "react";

const FAQModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Preguntas Frecuentes</h2>
        <ul className="space-y-4 text-sm text-gray-700">
          <li>
            <strong>¿Cómo creo una asesoría?</strong><br />
            Dirígete al Dashboard y haz clic en "Crear Curso" o "Crear Asesoría".
          </li>
          <li>
            <strong>¿Dónde veo mis asesorías activas?</strong><br />
            En el menú lateral, selecciona "Asesorías".
          </li>
          <li>
            <strong>¿Cómo contacto a un alumno?</strong><br />
            Usa la opción "Chat Alumno" para comunicarte directamente.
          </li>
          <li>
            <strong>¿Puedo editar mi perfil profesional?</strong><br />
            Sí, desde la opción "Perfil" en el menú lateral.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FAQModal;