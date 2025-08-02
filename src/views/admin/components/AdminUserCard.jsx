import React from "react";

const AdminUserCard = ({ user, type, onEdit, onViewDetails, onDelete }) => {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-4">
          {initial}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {user?.name || "Sin nombre"}
          </h3>
          <p className="text-gray-500 text-sm">{user?.email || "Sin email"}</p>
        </div>
      </div>
      <div className="text-gray-700 text-sm mb-4">
        <p>
          <span className="font-medium">Rol:</span> {type}
        </p>
        {user?.group && (
          <p>
            <span className="font-medium">Grupo:</span> {user.group}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm"
          onClick={onViewDetails}
        >
          Ver Detalles
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm"
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-300 text-sm"
          onClick={onDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default AdminUserCard;
