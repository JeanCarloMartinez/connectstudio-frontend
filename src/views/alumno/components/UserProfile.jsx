import { useState, useEffect } from "react";
import {
  obtenerAlumno,
  editarAlumno,
} from "./../../../services/alumno.service";
import { subirImagenPerfil } from "../../../services/usuario.service";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [nombreCompletoUsuario, setNombreCompletoUsuario] = useState(
    "Estudiante de Connect Studio"
  );
  const [emailUsuario, setEmailUsuario] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [direccionUsuario, setDireccionUsuario] = useState("");
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario] = useState("");
  const [matriculaAlumno, setMatriculaAlumno] = useState("");
  const [nombreCarrera, setNombreCarrera] = useState("");
  const [promedioAlumno, setPromedioAlumno] = useState(null);
  const [grupoAlumno, setGrupoAlumno] = useState("");
  const [profileImage, setProfileImage] = useState(null); // para preview
  const [profileImageUrl, setProfileImageUrl] = useState(null); // url real subida

  useEffect(() => {
    const solicitarDatosAlumno = async () => {
      const respuesta = await obtenerAlumno();
      if (respuesta.success) {
        const alumno = respuesta.alumno;
        setNombreCompletoUsuario(alumno.nombrecompletousuario || "");
        setEmailUsuario(alumno.emailusuario || "");
        setTelefonoUsuario(alumno.telefonousuario || "");
        setDireccionUsuario(alumno.direccionusuario || "");
        setFechaNacimientoUsuario(alumno.fechanacimientousuario || "");
        setMatriculaAlumno(alumno.matriculaalumno || "");
        setNombreCarrera(alumno.carreraalumno || "");
        setPromedioAlumno(alumno.promedioalumno || null);
        setGrupoAlumno(alumno.grupoalumno || "");
        setProfileImage(alumno.fotoperfilusuario);
        setProfileImageUrl(alumno.fotoperfilusuario);
      }
    };
    solicitarDatosAlumno();
  }, []);

  const editarDatosAlumno = async () => {
    const idUsuario = localStorage.getItem("idUsuario");

    const datosActualizados = {
      nombrecompletousuario: nombreCompletoUsuario,
      emailusuario: emailUsuario,
      telefonousuario: telefonoUsuario,
      direccionusuario: direccionUsuario,
      fechanacimientousuario: fechaNacimientoUsuario,
      fotoperfilusuario: profileImageUrl,
    };

    const resultado = await editarAlumno(idUsuario, datosActualizados);

    if (resultado.success) {
      alert("Perfil actualizado con éxito!");
      setIsEditing(false);
      setProfileImage(profileImageUrl);
    } else {
      alert("Error al actualizar el perfil.");
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Mostrar preview local mientras sube
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);

      try {
        const respuesta = await subirImagenPerfil(file);
        console.log("Respuesta subida imagen:", respuesta);

        const url = respuesta?.urlImagen;

        if (respuesta.success && url) {
          setProfileImageUrl(url);

          const idUsuario = localStorage.getItem("idUsuario");
          const resultado = await editarAlumno({
            idUsuario,
            fotoperfilusuario: url,
          });

          if (resultado.success) {
            setProfileImage(url);
            alert("Foto de perfil actualizada con éxito");
          } else {
            alert("Error al actualizar la foto de perfil");
          }
        } else {
          alert(
            "No se pudo subir la imagen. " +
              (respuesta?.mensaje || "Respuesta inválida del servidor")
          );
        }
      } catch (error) {
        console.error("Error en handleImageChange:", error);
        alert("Error inesperado al subir la imagen.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Mi Perfil</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold"
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
                />
              </label>
            )}
          </div>
          {isEditing ? (
            <input
              type="text"
              value={nombreCompletoUsuario}
              onChange={(e) => setNombreCompletoUsuario(e.target.value)}
              className="text-2xl font-semibold text-gray-800 text-center w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          ) : (
            <h3 className="text-2xl font-semibold text-gray-800">
              {nombreCompletoUsuario}
            </h3>
          )}
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Correo electrónico
            </label>
            {isEditing ? (
              <input
                type="email"
                value={emailUsuario}
                onChange={(e) => setEmailUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-700">
                {emailUsuario || "No especificado"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Teléfono
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={telefonoUsuario}
                onChange={(e) => setTelefonoUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-700">
                {telefonoUsuario || "No especificado"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Dirección
            </label>
            {isEditing ? (
              <input
                type="text"
                value={direccionUsuario}
                onChange={(e) => setDireccionUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-700">
                {direccionUsuario || "No especificado"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Matrícula
            </label>
            <p className="text-gray-700">
              {matriculaAlumno || "No especificado"}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Carrera
            </label>
            <p className="text-gray-700">
              {nombreCarrera || "No especificado"}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Promedio
            </label>
            <p className="text-gray-700">
              {promedioAlumno !== null
                ? promedioAlumno.toFixed(2)
                : "No especificado"}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Grupo
            </label>
            <p className="text-gray-700">{grupoAlumno || "No especificado"}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Fecha de nacimiento
            </label>
            {isEditing ? (
              <input
                type="date"
                value={
                  fechaNacimientoUsuario
                    ? new Date(fechaNacimientoUsuario)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                onChange={(e) => setFechaNacimientoUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-700">
                {fechaNacimientoUsuario
                  ? new Date(fechaNacimientoUsuario).toLocaleDateString()
                  : "No especificado"}
              </p>
            )}
          </div>
        </div>

        {isEditing && (
          <button
            onClick={editarDatosAlumno}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold mt-6"
          >
            Guardar Cambios
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
