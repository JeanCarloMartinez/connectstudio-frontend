// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Funcion para mostrar todas las aulas
export const mostrarAulas = async () => {
  try {
    const res = await fetch(`${BASE_URL}aulas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      aulas: data.aulas || [], // CORREGIDO
    };
  } catch (error) {
    console.log("Error al mostrar aulas: " + error.message);
    return { success: false, mensaje: "Error de conexión con el servidor" };
  }
};
