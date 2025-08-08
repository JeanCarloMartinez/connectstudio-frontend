// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Función para mostrar las citas según la matrícula del alumno
export const mostrarCitasPorMatriculaAlumno = async (matriculaAlumno) => {
  try {
    const res = await fetch(`${BASE_URL}citas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matriculaAlumno }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ MOSTRANDO CITAS CON ÉXITO");
      return { success: true, citas: data.citas || [] };
    } else {
      console.log(
        "⚠️ ERROR AL OBTENER CITAS:",
        data.error || "Respuesta no exitosa"
      );
      return { success: false, citas: [], error: data.error };
    }
  } catch (error) {
    console.log("❌ ERROR AL MOSTRAR CITAS:", error.message);
    return {
      success: false,
      citas: [],
      error: "Error de conexión con el servidor",
    };
  }
};
