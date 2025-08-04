import React, { useState, useEffect } from "react";
import AdminInput from "./AdminInput";
import AdminButton from "./AdminButton";
import Swal from "sweetalert2";

import { editarAlumno_panelAdmin } from "../../../services/alumno.service";
import { editarAsesor_panelAdmin } from "../../../services/asesor.service";

const AdminEditUserModal = ({ user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedUser(user);
    setErrors({});
  }, [user]);

  const validate = () => {
    let newErrors = {};
    if (!editedUser.name?.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!editedUser.email?.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      newErrors.email = "El email no es válido.";
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

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    if (!validate()) return;

    const result = await Swal.fire({
      title: "¿Estás seguro de guardar los cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    });

    // if (result.isConfirmed) {
    //   console.log("Guardando cambios para el usuario:", editedUser);

    //   try {
    //     const cleanValue = (value) => {
    //       return value === "No especificado" ? "" : value;
    //     };

    //     // Llamar a editarAlumno con los datos necesarios y adaptados
    //     const response = await editarAlumno_panelAdmin({
    //       idUsuario: editedUser.id,
    //       nombreCompletoUsuario: cleanValue(editedUser.name),
    //       matricula: cleanValue(editedUser.matricula),
    //       emailUsuario: cleanValue(editedUser.email),
    //       fechaNacimientoUsuario: cleanValue(editedUser.fechaNacimiento),
    //       direccionUsuario: cleanValue(editedUser.direccion),
    //       fotoPerfilUsuario: cleanValue(editedUser.fotoPerfilUsuario),
    //       carreraAlumno: cleanValue(editedUser.carrera),
    //       grupoAlumno: cleanValue(editedUser.group),
    //       promedioAlumno: cleanValue(editedUser.promedio),
    //     });

    //     if (response.success) {
    //       Swal.fire("Guardado", response.mensaje, "success");
    //       onSave(editedUser);
    //       onClose();
    //     } else {
    //       Swal.fire("Error", response.mensaje, "error");
    //     }
    //   } catch (error) {
    //     Swal.fire("Error", "Error inesperado al guardar", "error");
    //   }
    // }

    if (result.isConfirmed) {
      console.log("Guardando cambios para el usuario:", editedUser);

      try {
        const cleanValue = (value) => {
          return value === "No especificado" ? "" : value;
        };

        switch (editedUser.role) {
          case "Estudiante":
            // Llamar a editarAlumno con los datos necesarios y adaptados
            const response = await editarAlumno_panelAdmin({
              idUsuario: editedUser.id,
              nombreCompletoUsuario: cleanValue(editedUser.name),
              matricula: cleanValue(editedUser.matricula),
              emailUsuario: cleanValue(editedUser.email),
              fechaNacimientoUsuario: cleanValue(editedUser.fechaNacimiento),
              direccionUsuario: cleanValue(editedUser.direccion),
              fotoPerfilUsuario: cleanValue(editedUser.fotoPerfilUsuario),
              carreraAlumno: cleanValue(editedUser.carrera),
              grupoAlumno: cleanValue(editedUser.group),
              promedioAlumno: cleanValue(editedUser.promedio),
            });

            if (response.success) {
              Swal.fire("Guardado", response.mensaje, "success");
              onSave(editedUser);
              onClose();
            } else {
              Swal.fire("Error", response.mensaje, "error");
            }
            break;
          case "admin":
            // llamar a editarAdministrador()
            Swal.fire(
              "Info",
              "Función de edición de administrador no implementada",
              "info"
            );
            break;

          case "Asesor":
            // Llamar a editarAlumno con los datos necesarios y adaptados
            const response2 = await editarAsesor_panelAdmin({
              idUsuario: editedUser.id,
              nombreCompletoUsuario: cleanValue(editedUser.name),
              matricula: cleanValue(editedUser.matricula),
              emailUsuario: cleanValue(editedUser.email),
              fechaNacimientoUsuario: cleanValue(editedUser.fechaNacimiento),
              direccionUsuario: cleanValue(editedUser.direccion),
              fotoPerfilUsuario: cleanValue(editedUser.fotoPerfilUsuario),
              carreraAsesor: cleanValue(editedUser.carrera),
              grupoAsesor: cleanValue(editedUser.group),
              promedioAsesor: cleanValue(editedUser.promedio),
            });

            if (response2.success) {
              Swal.fire("Guardado", response2.mensaje, "success");
              onSave(editedUser);
              onClose();
            } else {
              Swal.fire("Error", response2.mensaje, "error");
            }
            break;

          default:
            Swal.fire("Error", "Tipo de usuario no reconocido", "error");
            break;
        }
      } catch (error) {
        Swal.fire("Error", "Error inesperado al guardar", "error");
      }
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Editar Alumno
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <AdminInput
                label="Nombre"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                placeholder="Nombre completo"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <AdminInput
                label="Email"
                name="email"
                type="email"
                value={editedUser.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {user.matricula && (
              <AdminInput
                label="Matrícula"
                name="matricula"
                value={editedUser.matricula}
                onChange={handleChange}
                placeholder="Matrícula"
              />
            )}

            <AdminInput
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              value={editedUser.fechaNacimiento}
              onChange={handleChange}
              placeholder="DD/MM/AAAA"
            />

            <AdminInput
              label="Dirección"
              name="direccion"
              value={editedUser.direccion}
              onChange={handleChange}
              placeholder="Dirección del alumno"
            />

            {user.group && (
              <AdminInput
                label="Grupo"
                name="group"
                value={editedUser.group}
                onChange={handleChange}
                placeholder="Grupo"
              />
            )}

            {user.carrera && (
              <AdminInput
                label="Carrera"
                name="carrera"
                value={editedUser.carrera}
                onChange={handleChange}
                placeholder="Carrera del alumno"
              />
            )}

            {user.promedio && (
              <AdminInput
                label="Promedio"
                name="promedio"
                value={editedUser.promedio}
                onChange={handleChange}
                placeholder="Promedio general"
              />
            )}
          </div>

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
