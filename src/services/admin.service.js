// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// funcion para obtener los datos de un administrador mediante el idUsuario
export const obtenerAdmin = async () => {
  try {
    // Obtener el idUsuario del localStorage
    const idUsuario = localStorage.getItem("idusuario");
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}admins/${idUsuario}`, {
      // Metodo de solicitud
      method: "GET",
      // Tipo de contenido
      headers: {
        "Content-Type": "application/json",
      },
    }); // Fin de la solicitud al backend

    // Guardar los datos en una variable
    const data = await respuesta.json();

    if (respuesta.ok) {
      // Mostrar un mensaje en caso de exito
      console.log("✅ ADMIN OBTENIDO CON EXITO");
    }

    // Retornar si se realizo la operacion y el objeto con la informacion consultada
    return {
      success: respuesta.ok,
      admin: data.admin[0] || null,
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL OBTENER ADMIN" + error.message);
  }
}; // Fin de la funcion obtenerAdmin

// Modulo para testear funciones
// Funcion que solicita al backend cambiar los datos del admin
export const modificarDatosAdministrador = async (
  // Declarar un objeto con los datos necesarios para editar el admin
  {
    idUsuario,
    nombreCompletoUsuario,
    emailUsuario,
    fechaNacimientoUsuario,
    direccionUsuario,
    fotoPerfilUsuario,
  }
) => {
  try {
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}admins/${idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuario,
        nombreCompletoUsuario,
        emailUsuario,
        fechaNacimientoUsuario,
        direccionUsuario,
        fotoPerfilUsuario,
      }),
    }); // Fin de la solicitud al backend

    // Validar si la respuesta fue exitosa
    if (respuesta.ok) {
      return {
        success: respuesta.ok,
        mensaje: "Los datos del admin fueron modificados correctamente",
      };
    } else {
      return {
        success: respuesta.ok,
        mensaje: "Se ha producido un error al modificar los datos del admin",
      };
    }
  } catch (error) {
    console.log(
      "Ha ocurrido un error inesperado en el servidor: " + error.message
    );
    return {
      success: false,
      mensaje: "Ha ocurrido un error inesperado en el servidor: ",
    };
  }
};
