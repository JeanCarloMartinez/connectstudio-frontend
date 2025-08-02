import React, { useState, useEffect } from 'react';
import AdminInput from './AdminInput';
import AdminButton from './AdminButton';

const AdminEditUserModal = ({ user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedUser(user);
    setErrors({}); // Limpiar errores al abrir el modal
  }, [user]);

  const validate = () => {
    let newErrors = {};
    if (!editedUser.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
    }
    if (!editedUser.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      newErrors.email = 'El email no es válido.';
    }
    // Puedes añadir más validaciones según el rol o campos específicos
    if (editedUser.role === 'Estudiante' && !editedUser.course.trim()) {
      newErrors.course = 'El curso es obligatorio para estudiantes.';
    }
    if (editedUser.role === 'Asesor' && !editedUser.specialty.trim()) {
      newErrors.specialty = 'La especialidad es obligatoria para asesores.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    // Limpiar el error específico cuando el usuario empieza a escribir
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
      onSave(editedUser);
      onClose();
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Editar Usuario</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <AdminInput
            label="Nombre"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            placeholder="Nombre completo"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

          <AdminInput
            label="Email"
            name="email"
            type="email"
            value={editedUser.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          {editedUser.role && (
            <AdminInput
              label="Rol"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              placeholder="Rol del usuario"
              disabled // El rol no debería ser editable directamente aquí
            />
          )}
          {editedUser.course !== undefined && ( // Usar undefined para verificar si la propiedad existe
            <>
              <AdminInput
                label="Curso"
                name="course"
                value={editedUser.course}
                onChange={handleChange}
                placeholder="Curso asignado"
              />
              {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
            </>
          )}
          {editedUser.group !== undefined && (
            <AdminInput
              label="Grupo"
              name="group"
              value={editedUser.group}
              onChange={handleChange}
              placeholder="Grupo asignado"
            />
          )}
          {editedUser.specialty !== undefined && (
            <>
              <AdminInput
                label="Especialidad"
                name="specialty"
                value={editedUser.specialty}
                onChange={handleChange}
                placeholder="Especialidad del asesor"
              />
              {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
            </>
          )}
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

export default AdminEditUserModal;