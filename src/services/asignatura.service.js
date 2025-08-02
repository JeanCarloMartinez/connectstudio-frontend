const BASE_URL = "http://localhost:3000";

// Mostrar asignaturas
export const mostrarAsignaturas = async () => {
  try {
    const res = await fetch(`${BASE_URL}/asignaturas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      asignaturas: data.asignaturas || [],
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("Error al mostrar asignaturas:", error.message);
    return {
      success: false,
      asignaturas: [],
      mensaje: "Error de conexión con el servidor",
    };
  }
};
