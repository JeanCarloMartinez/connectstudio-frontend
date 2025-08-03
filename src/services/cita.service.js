// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// // Funcion para mostrar las asesorias en base la matricula de alumno
// export const mostrarCitasPorMatriculaAlumno = async (matriculaAlumno) => {
//   try {
//     // Realizar la solicitud al backend
//     const respuesta = await fetch(`${BASE_URL}/citas`, {
//       // Metodo de solicitud
//       method: "POST",
//       // Tipo de contenido
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Pasar los datos a JSON
//       body: JSON.stringify({ matriculaAlumno }),
//     }); // Fin de la solicitud al backend

//     // Guardar los datos en una variable
//     const data = await respuesta.json();

//     if (respuesta.ok) {
//       // Mostrar un mensaje en caso de exito
//       console.log("✅ MOSTRANDO CITAS CON EXITO");
//     }

//     // Retornar si se realizo la operacion y el objeto con la informacion consultada
//     return {
//       success: respuesta.ok,
//       citas: data.citas || [],
//     };
//   } catch (error) {
//     // Mostrar un mensaje en caso de error
//     console.log("❌ ERROR AL MOSTRAR CITAS" + error.message);
//   }
// }; // Fin de la funcion mostrarAsesoriasPorMatriculaAlumno

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
