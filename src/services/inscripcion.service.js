// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Mostrar todas las inscripciones
export const mostrarInscripciones = async () => {
  try {
    const res = await fetch(`${BASE_URL}/inscripciones`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return {
      success: res.ok,
      inscripciones: data.inscripciones || [],
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.error("Error al mostrar inscripciones:", error.message);
    return {
      success: false,
      inscripciones: [],
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Funcion para mostrar las inscripciones en base la matricula de alumno
export const mostrarInscripcionesPorMatriculaAlumno = async (
  matriculaAlumno
) => {
  try {
    // Realizar la solicitud al backend
    const respuesta = await fetch(
      `${BASE_URL}inscripciones/${matriculaAlumno}`,
      {
        // Metodo de solicitud
        method: "GET",
        // Tipo de contenido
        headers: {
          "Content-Type": "application/json",
        },
        // // Pasar los datos a JSON
        // body: JSON.stringify({ matriculaAlumno }),
      }
    );

    // Guardar los datos en una variable
    const data = await respuesta.json();

    if (respuesta.ok) {
      // Mostrar un mensaje en caso de exito
      console.log("✅ MOSTRANDO INSCRIPCIONES CON EXITO");
    }

    // Retornar si se realizo la operacion y el objeto con la informacion consultada
    console.log("Datos recibidos: ", data.inscripciones);
    return {
      success: respuesta.ok,
      inscripciones: data.inscripciones || [],
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL MOSTRAR INSCRIPCIONES" + error.message);
  }
}; // Fin de la funcion mostrarInscripcionesPorMatriculaAlumno

// Registrar inscripción
export const registrarInscripcion = async (inscripcion) => {
  try {
    const res = await fetch(`${BASE_URL}inscripciones/registrar`, {
      // <-- aquí cambia la URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inscripcion),
    });
    const data = await res.json();
    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.error("Error al registrar inscripción:", error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};
