// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Funcion para mostrar todos los cursos
export const mostrarCursos = async () => {
  try {
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}cursos`, {
      // Metodo de solicitud
      method: "GET",
      // Tipo de contenido
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Guardar los datos en una variable
    const data = await respuesta.json();

    if (respuesta.ok) {
      // Mostrar un mensaje en caso de exito
      console.log("✅ MOSTRANDO CURSOS CON EXITO");
    }

    // Retornar si se realizo la operacion y el objeto con la informacion consultada
    return {
      success: respuesta.ok,
      cursos: data.cursos || [],
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL MOSTRAR CURSOS" + error.message);
  }
}; // Fin de la funcion mostrarCursos

// Mostrar cursos por matrícula del asesor
export const mostrarCursosPorMatricula = async (matricula) => {
  try {
    const res = await fetch(`${BASE_URL}cursos/${matricula}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("Datos recibidos: ", data.cursos);
    return {
      success: res.ok,
      cursos: data.cursos || [],
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("Error al mostrar cursos por matrícula:", error.message);
    return {
      success: false,
      cursos: [],
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Funcion para registrar un nuevo curso desde le ftontend
export const registrarCurso = async (
  tituloCurso,
  descripcionCurso,
  idAsignatura,
  matriculaAsesor
) => {
  try {
    const res = await fetch(`${BASE_URL}cursos/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tituloCurso,
        descripcionCurso,
        idAsignatura,
        matriculaAsesor,
      }),
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("❌ ERROR AL REGISTRAR AL NUEVO CURSO: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};
