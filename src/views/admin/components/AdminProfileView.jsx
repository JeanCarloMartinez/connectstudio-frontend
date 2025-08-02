import React from 'react';
import AdminSectionTitle from './AdminSectionTitle';
import AdminButton from './AdminButton';

const AdminProfileView = ({ adminUser, onEditProfile }) => {
  return (
    <>
      <AdminSectionTitle title="Perfil del Administrador" description="Visualiza y gestiona la información de tu cuenta de administrador." />
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-6xl border-4 border-blue-300 mb-4">
            {adminUser.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{adminUser.name}</h3>
          <p className="text-gray-500 text-lg">{adminUser.email}</p>
        </div>

        <div className="space-y-6 text-gray-700">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-xl font-semibold mb-2">Rol:</p>
            <p className="text-2xl">{adminUser.role}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-xl font-semibold mb-2">Último Acceso:</p>
            <p className="text-2xl">{adminUser.lastLogin}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-xl font-semibold mb-2">ID de Administrador:</p>
            <p className="text-2xl">{adminUser.id}</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <AdminButton onClick={onEditProfile} type="primary">
            Editar Perfil
          </AdminButton>
        </div>
      </div>
    </>
  );
};

export default AdminProfileView;