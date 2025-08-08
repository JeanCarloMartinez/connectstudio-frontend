// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Función para mostrar actividades por ID de curso
export const mostrarActividadesPorCurso = async (idCurso) => {
  try {
    const respuesta = await fetch(`${BASE_URL}actividades/${idCurso}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      console.log("✅ MOSTRANDO ACTIVIDADES DEL CURSO CON EXITO");
    }

    return {
      success: respuesta.ok,
      actividades: data.actividades || [],
    };
  } catch (error) {
    console.log("❌ ERROR AL MOSTRAR ACTIVIDADES: " + error.message);
    return {
      success: false,
      actividades: [],
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Función para registrar una nueva actividad desde el frontend
export const registrarActividad = async (
  tituloActividad,
  descripcionActividad,
  fechaEntregaActividad,
  idCurso
) => {
  try {
    const respuesta = await fetch(`${BASE_URL}actividades/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tituloActividad,
        descripcionActividad,
        fechaEntregaActividad,
        idCurso,
      }),
    });

    const data = await respuesta.json();

    return {
      success: respuesta.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("❌ ERROR AL REGISTRAR ACTIVIDAD: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Función para editar una actividad desde el frontend
export const editarActividad = async (
  idActividad,
  tituloActividad,
  descripcionActividad,
  fechaEntregaActividad,
  idCurso
) => {
  try {
    const respuesta = await fetch(`${BASE_URL}actividades/${idActividad}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tituloActividad,
        descripcionActividad,
        fechaEntregaActividad,
        idCurso,
      }),
    });

    const data = await respuesta.json();

    return {
      success: respuesta.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("❌ ERROR AL EDITAR ACTIVIDAD: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Función para eliminar una actividad desde el frontend
export const eliminarActividad = async (idActividad) => {
  try {
    const respuesta = await fetch(`${BASE_URL}actividades/${idActividad}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respuesta.json();

    return {
      success: respuesta.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("❌ ERROR AL ELIMINAR ACTIVIDAD: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};
