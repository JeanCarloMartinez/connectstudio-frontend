// Url base del backend desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Función para mostrar los comentarios de un curso
export const mostrarComentariosPorCurso = async (idCurso) => {
  try {
    // Realizar la solicitud al backend
    const respuesta = await fetch(
      `${BASE_URL}comentariocurso/curso/${idCurso}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Guardar los datos en una variable
    const data = await respuesta.json();

    if (respuesta.ok) {
      // Mostrar un mensaje en caso de éxito
      console.log("✅ MOSTRANDO COMENTARIOS DEL CURSO CON ÉXITO");
    }

    // Retornar si se realizó la operación y el objeto con la información consultada
    return {
      success: respuesta.ok,
      comentarios: data.comentarios || [],
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL MOSTRAR COMENTARIOS: " + error.message);
    return {
      success: false,
      comentarios: [],
      mensaje: "Error de conexión con el servidor",
    };
  }
}; // Fin de la función mostrarComentariosPorCurso

// Función para registrar un nuevo comentario
export const registrarComentario = async (
  contenidoComentario,
  idCurso,
  idUsuario
) => {
  try {
    // Realizar la solicitud al backend
    const res = await fetch(`${BASE_URL}comentariocurso/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contenidoComentario,
        idCurso,
        idUsuario,
      }),
    });

    // Guardar la respuesta del backend
    const data = await res.json();

    // Retornar el estado y el mensaje
    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL REGISTRAR COMENTARIO: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
}; // Fin de la función registrarComentario

// Función para eliminar un comentario
export const eliminarComentario = async (idComentario) => {
  try {
    // Realizar la solicitud al backend
    const res = await fetch(`${BASE_URL}comentariocurso/${idComentario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Guardar la respuesta del backend
    const data = await res.json();

    // Retornar el estado y el mensaje
    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL ELIMINAR COMENTARIO: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
}; // Fin de la función eliminarComentario
