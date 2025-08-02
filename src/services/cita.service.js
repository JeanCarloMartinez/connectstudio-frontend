// Url base para consultas al servidor
const BASE_URL = "http://localhost:3000";

// Funcion para mostrar las asesorias en base la matricula de alumno
export const mostrarCitasPorMatriculaAlumno = async (matriculaAlumno) => {
  try {
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}/citas`, {
      // Metodo de solicitud
      method: "POST",
      // Tipo de contenido
      headers: {
        "Content-Type": "application/json",
      },
      // Pasar los datos a JSON
      body: JSON.stringify({ matriculaAlumno }),
    }); // Fin de la solicitud al backend

    // Guardar los datos en una variable
    const data = await respuesta.json();

    if (respuesta.ok) {
      // Mostrar un mensaje en caso de exito
      console.log("✅ MOSTRANDO CITAS CON EXITO");
    }

    // Retornar si se realizo la operacion y el objeto con la informacion consultada
    return {
      success: respuesta.ok,
      citas: data.citas || [],
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL MOSTRAR CITAS" + error.message);
  }
}; // Fin de la funcion mostrarAsesoriasPorMatriculaAlumno
