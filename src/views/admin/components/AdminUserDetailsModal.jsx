import React from 'react';
import AdminButton from './AdminButton';

const AdminUserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs transform transition-all duration-300 scale-100 opacity-100"> {/* Cambiado max-w-sm a max-w-xs y p-8 a p-6 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">Detalles del Usuario</h2> {/* Reducido tamaño de fuente y mb */}
        <div className="space-y-3 text-gray-700"> {/* Reducido space-y */}
          <div className="flex items-center justify-center mb-5"> {/* Reducido mb */}
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-4xl border-3 border-blue-300"> {/* Reducido tamaño y borde */}
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200"> {/* Reducido padding */}
            <p className="text-base font-semibold mb-1">Nombre:</p> {/* Reducido tamaño de fuente */}
            <p className="text-lg">{user.name}</p> {/* Reducido tamaño de fuente */}
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-base font-semibold mb-1">Email:</p>
            <p className="text-lg">{user.email}</p>
          </div>
          {user.role && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-base font-semibold mb-1">Rol:</p>
              <p className="text-lg">{user.role}</p>
            </div>
          )}
          {user.course && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-base font-semibold mb-1">Curso:</p>
              <p className="text-lg">{user.course}</p>
            </div>
          )}
          {user.group && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-base font-semibold mb-1">Grupo:</p>
              <p className="text-lg">{user.group}</p>
            </div>
          )}
          {user.specialty && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-base font-semibold mb-1">Especialidad:</p>
              <p className="text-lg">{user.specialty}</p>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-6"> {/* Reducido mt */}
          <AdminButton onClick={onClose} type="primary">
            Cerrar
          </AdminButton>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailsModal;

// DONE