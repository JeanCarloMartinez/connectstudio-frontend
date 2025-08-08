import { useState, useEffect } from "react";
import {
  obtenerAlumno,
  editarAlumno,
} from "./../../../services/alumno.service";
import { subirImagenPerfil } from "../../../services/usuario.service";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombrecompletousuario: "",
    emailusuario: "",
    telefonousuario: "",
    direccionusuario: "",
    fechanacimientousuario: "",
    fotoperfilusuario: "",
  });
  const [alumnoData, setAlumnoData] = useState({
    matriculaalumno: "",
    carreraalumno: "",
    promedioalumno: null,
    grupoalumno: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cargarDatosAlumno = async () => {
      try {
        const respuesta = await obtenerAlumno();
        if (respuesta.success) {
          const { alumno } = respuesta;

          setFormData({
            nombrecompletousuario: alumno.nombrecompletousuario || "",
            emailusuario: alumno.emailusuario || "",
            telefonousuario: alumno.telefonousuario || "",
            direccionusuario: alumno.direccionusuario || "",
            fechanacimientousuario: alumno.fechanacimientousuario || "",
            fotoperfilusuario: alumno.fotoperfilusuario || "",
          });

          setAlumnoData({
            matriculaalumno: alumno.matriculaalumno || "",
            carreraalumno: alumno.carreraalumno || "",
            promedioalumno: alumno.promedioalumno || null,
            grupoalumno: alumno.grupoalumno || "",
          });

          setProfileImage(alumno.fotoperfilusuario);
          setProfileImageUrl(alumno.fotoperfilusuario);
        }
      } catch (error) {
        console.error("Error al cargar datos del alumno:", error);
      }
    };

    cargarDatosAlumno();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailusuario) {
      newErrors.emailusuario = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailusuario)) {
      newErrors.emailusuario = "Ingrese un correo electrónico válido";
    }

    if (!formData.nombrecompletousuario) {
      newErrors.nombrecompletousuario = "El nombre completo es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      fechanacimientousuario: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const idUsuario = localStorage.getItem("idusuario");
      const resultado = await editarAlumno(idUsuario, {
        ...formData,
        fotoperfilusuario: profileImageUrl || formData.fotoperfilusuario,
      });

      if (resultado.success) {
        alert("Perfil actualizado con éxito!");
        setIsEditing(false);
        setProfileImage(profileImageUrl || formData.fotoperfilusuario);
      } else {
        alert(resultado.mensaje || "Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Ocurrió un error al actualizar el perfil");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validación frontend de la imagen
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen no debe exceder los 5MB");
        return;
      }

      // Preview local
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);

      try {
        const respuesta = await subirImagenPerfil(file);

        if (respuesta.success && respuesta.urlImagen) {
          setProfileImageUrl(respuesta.urlImagen);
          // No actualizamos todo el perfil aquí, solo guardamos la URL para el submit
        } else {
          alert(respuesta.mensaje || "Error al subir la imagen");
          setProfileImage(profileImageUrl); // Revertir a la imagen anterior
        }
      } catch (error) {
        console.error("Error al subir imagen:", error);
        alert("Error al subir la imagen");
        setProfileImage(profileImageUrl); // Revertir a la imagen anterior
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No especificado";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Mi Perfil</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold"
            disabled={isSubmitting}
          >
            {isEditing ? "Cancelar" : "Editar Perfil"}
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-5xl font-bold mb-4 overflow-hidden relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-24 h-24 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            )}
            {isEditing && (
              <label
                htmlFor="profile-upload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity rounded-full"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                />
              </label>
            )}
          </div>
          {isEditing ? (
            <div className="w-full">
              <input
                type="text"
                name="nombrecompletousuario"
                value={formData.nombrecompletousuario}
                onChange={handleInputChange}
                className={`text-2xl font-semibold text-gray-800 text-center w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition ${
                  errors.nombrecompletousuario
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                placeholder="Nombre completo"
              />
              {errors.nombrecompletousuario && (
                <p className="text-red-500 text-sm mt-1 text-center">
                  {errors.nombrecompletousuario}
                </p>
              )}
            </div>
          ) : (
            <h3 className="text-2xl font-semibold text-gray-800">
              {formData.nombrecompletousuario || "Estudiante de Connect Studio"}
            </h3>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Correo electrónico *
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="email"
                    name="emailusuario"
                    value={formData.emailusuario}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.emailusuario
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-500"
                    }`}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.emailusuario && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.emailusuario}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-700">
                  {formData.emailusuario || "No especificado"}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Teléfono
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="telefonousuario"
                  value={formData.telefonousuario}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+52 123 456 7890"
                />
              ) : (
                <p className="text-gray-700">
                  {formData.telefonousuario || "No especificado"}
                </p>
              )}
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Dirección
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="direccionusuario"
                  value={formData.direccionusuario}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Calle, número, colonia"
                />
              ) : (
                <p className="text-gray-700">
                  {formData.direccionusuario || "No especificado"}
                </p>
              )}
            </div>

            {/* Matrícula */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Matrícula
              </label>
              <p className="text-gray-700">
                {alumnoData.matriculaalumno || "No especificado"}
              </p>
            </div>

            {/* Carrera */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Carrera
              </label>
              <p className="text-gray-700">
                {alumnoData.carreraalumno || "No especificado"}
              </p>
            </div>

            {/* Promedio */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Promedio
              </label>
              <p className="text-gray-700">
                {!isNaN(Number(alumnoData.promedioalumno))
                  ? Number(alumnoData.promedioalumno).toFixed(2)
                  : "No especificado"}
              </p>
            </div>

            {/* Grupo */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Grupo
              </label>
              <p className="text-gray-700">
                {alumnoData.grupoalumno || "No especificado"}
              </p>
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Fecha de nacimiento
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="fechanacimientousuario"
                  value={
                    formData.fechanacimientousuario
                      ? new Date(formData.fechanacimientousuario)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleDateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  max={new Date().toISOString().split("T")[0]}
                />
              ) : (
                <p className="text-gray-700">
                  {formatDate(formData.fechanacimientousuario)}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
