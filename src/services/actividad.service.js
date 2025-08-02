// Url base para consultas al servidor
const BASE_URL = "http://localhost:3000";

// Función para mostrar todas las actividades
export const mostrarActividades = async () => {
  try {
    const respuesta = await fetch(`${BASE_URL}/actividades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      console.log("✅ ACTIVIDADES OBTENIDAS CON ÉXITO");
    }

    return {
      success: respuesta.ok,
      actividades: data.actividades || [],
    };
  } catch (error) {
    console.log("❌ ERROR AL OBTENER ACTIVIDADES: " + error.message);
    return { success: false, actividades: [] };
  }
};

// Función para mostrar actividades de un curso específico
export const mostrarActividadesPorCurso = async (idCurso) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/actividades/curso/${idCurso}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      console.log("✅ ACTIVIDADES DEL CURSO OBTENIDAS");
    }

    return {
      success: respuesta.ok,
      actividades: data.actividades || [],
    };
  } catch (error) {
    console.log("❌ ERROR AL OBTENER ACTIVIDADES POR CURSO: " + error.message);
    return { success: false, actividades: [] };
  }
};

// Función para obtener una actividad mediante idActividad
export const obtenerActividad = async (idActividad) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/actividades/${idActividad}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      console.log("✅ ACTIVIDAD OBTENIDA CON ÉXITO");
    }

    return {
      success: respuesta.ok,
      actividad: data.actividad[0] || null,
    };
  } catch (error) {
    console.log("❌ ERROR AL OBTENER ACTIVIDAD: " + error.message);
    return { success: false, actividad: null };
  }
};

// Función para registrar una nueva actividad
export const registrarActividad = async ({
  tituloActividad,
  descripcionActividad,
  fechaEntrega,
  idCurso,
}) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/actividades/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tituloActividad,
        descripcionActividad,
        fechaEntrega,
        idCurso,
      }),
    });

    if (respuesta.ok) {
      console.log("✅ ACTIVIDAD REGISTRADA CON ÉXITO");
    }

    return { success: respuesta.ok };
  } catch (error) {
    console.log("❌ ERROR AL REGISTRAR ACTIVIDAD: " + error.message);
    return { success: false };
  }
};

// Función para editar una actividad mediante idActividad
export const editarActividad = async ({
  idActividad,
  tituloActividad,
  descripcionActividad,
  fechaEntrega,
  idCurso,
}) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/actividades/${idActividad}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tituloActividad,
        descripcionActividad,
        fechaEntrega,
        idCurso,
      }),
    });

    if (respuesta.ok) {
      console.log("✅ ACTIVIDAD ACTUALIZADA CON ÉXITO");
      return { success: true };
    } else {
      console.log("❌ ERROR AL ACTUALIZAR ACTIVIDAD");
      return { success: false };
    }
  } catch (error) {
    console.log("❌ ERROR EN editarActividad: " + error.message);
    return { success: false };
  }
};

// Función para eliminar una actividad mediante idActividad
export const eliminarActividad = async (idActividad) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/actividades/${idActividad}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (respuesta.ok) {
      console.log("✅ ACTIVIDAD ELIMINADA CON ÉXITO");
      return { success: true };
    } else {
      console.log("❌ ERROR AL ELIMINAR ACTIVIDAD");
      return { success: false };
    }
  } catch (error) {
    console.log("❌ ERROR EN eliminarActividad: " + error.message);
    return { success: false };
  }
};
