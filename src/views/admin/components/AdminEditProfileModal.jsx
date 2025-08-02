import React, { useState, useEffect } from "react";
import AdminInput from "./AdminInput";
import AdminButton from "./AdminButton";

const AdminEditProfileModal = ({ adminUser, onClose, onSave }) => {
  const [editedAdmin, setEditedAdmin] = useState(adminUser);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedAdmin(adminUser);
    setErrors({});
  }, [adminUser]);

  const validate = () => {
    let newErrors = {};
    if (!editedAdmin.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!editedAdmin.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(editedAdmin.email)) {
      newErrors.email = "El email no es válido.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    if (validate()) {
      onSave(editedAdmin);
      onClose();
    }
  };

  if (!adminUser) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Editar Perfil de Administrador
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <AdminInput
            label="Nombre"
            name="name"
            value={editedAdmin.name}
            onChange={handleChange}
            placeholder="Nombre completo"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          <AdminInput
            label="Email"
            name="email"
            type="email"
            value={editedAdmin.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          <AdminInput
            label="Rol"
            name="role"
            value={editedAdmin.role}
            placeholder="Rol del administrador"
            disabled
          />
          <AdminInput
            label="Último Acceso"
            name="lastLogin"
            value={editedAdmin.lastLogin}
            placeholder="Fecha y hora del último acceso"
            disabled
          />
          <AdminInput
            label="ID de Administrador"
            name="id"
            value={editedAdmin.id}
            placeholder="ID único del administrador"
            disabled
          />

          <div className="flex justify-end space-x-4 mt-8">
            <AdminButton onClick={onClose} type="secondary">
              Cancelar
            </AdminButton>
            <AdminButton onClick={handleSave} type="primary">
              Guardar Cambios
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProfileModal;
