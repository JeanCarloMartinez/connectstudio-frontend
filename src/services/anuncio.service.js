// Url base del backend desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Función para mostrar los anuncios de un curso
export const mostrarAnunciosPorCurso = async (idCurso) => {
  try {
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}anuncios/curso/${idCurso}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Guardar los datos en una variable
    const data = await respuesta.json();

    if (respuesta.ok) {
      // Mostrar un mensaje en caso de éxito
      console.log("✅ MOSTRANDO ANUNCIOS DEL CURSO CON ÉXITO");
    }

    // Retornar si se realizó la operación y el objeto con la información consultada
    return {
      success: respuesta.ok,
      anuncios: data.anuncios || [],
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL MOSTRAR ANUNCIOS: " + error.message);
    return {
      success: false,
      anuncios: [],
      mensaje: "Error de conexión con el servidor",
    };
  }
}; // Fin de la función mostrarAnunciosPorCurso

// Función para registrar un nuevo anuncio
export const registrarAnuncio = async (
  tituloAnuncio,
  contenidoAnuncio,
  idCurso
) => {
  try {
    // Realizar la solicitud al backend
    const res = await fetch(`${BASE_URL}anuncios/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tituloAnuncio,
        contenidoAnuncio,
        idCurso,
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
    console.log("❌ ERROR AL REGISTRAR ANUNCIO: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
}; // Fin de la función registrarAnuncio

// Función para eliminar un anuncio
export const eliminarAnuncio = async (idAnuncio) => {
  try {
    // Realizar la solicitud al backend
    const res = await fetch(`${BASE_URL}anuncios/${idAnuncio}`, {
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
    console.log("❌ ERROR AL ELIMINAR ANUNCIO: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
}; // Fin de la función eliminarAnuncio
