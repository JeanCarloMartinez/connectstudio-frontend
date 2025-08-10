// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Función auxiliar para limpiar valores
const cleanValue = (value) => {
  if (value === "" || value === "No especificado" || value === undefined)
    return null;
  return value;
};

// Función para obtener los datos de un administrador mediante el idUsuario
export const obtenerAdmin = async () => {
  try {
    const idUsuario = localStorage.getItem("idusuario");

    const respuesta = await fetch(`${BASE_URL}admins/${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      // console.log("✅ ADMIN OBTENIDO CON ÉXITO");
    }

    return {
      success: respuesta.ok,
      admin: data.admin?.[0] || null,
    };
  } catch (error) {
    console.log("❌ ERROR AL OBTENER ADMIN:", error.message);
    return {
      success: false,
      admin: null,
      error: error.message,
    };
  }
};

// Función que solicita al backend cambiar los datos del admin
export const modificarDatosAdministrador = async ({
  idUsuario,
  nombreCompletoUsuario,
  emailUsuario,
  fechaNacimientoUsuario,
  direccionUsuario,
  fotoPerfilUsuario,
  passwordUsuario, // 🔧 asegúrate de enviar este valor desde el componente
}) => {
  try {
    const respuesta = await fetch(`${BASE_URL}admins/${idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuario,
        nombreCompletoUsuario: cleanValue(nombreCompletoUsuario),
        emailUsuario: cleanValue(emailUsuario),
        fechaNacimientoUsuario: cleanValue(fechaNacimientoUsuario),
        direccionUsuario: cleanValue(direccionUsuario),
        fotoPerfilUsuario: cleanValue(fotoPerfilUsuario),
        passwordUsuario: cleanValue(passwordUsuario),
      }),
    });

    if (respuesta.ok) {
      return {
        success: true,
        mensaje: "Los datos del admin fueron modificados correctamente",
      };
    } else {
      return {
        success: false,
        mensaje: "Se ha producido un error al modificar los datos del admin",
      };
    }
  } catch (error) {
    console.log("❌ ERROR AL MODIFICAR ADMIN:", error.message);
    return {
      success: false,
      mensaje: "Ha ocurrido un error inesperado en el servidor",
    };
  }
};
