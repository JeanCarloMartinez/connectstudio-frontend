// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Funcion para mostrar los asesores
export const mostrarAsesores = async () => {
  try {
    const res = await fetch(`${BASE_URL}asesores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      asesores: data.asesores || [],
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("Error al mostrar asesores: ", error.message);
    return {
      success: false,
      asesores: [],
      mensaje: "Error de conexion con el servidor",
    };
  }
};

// Funcion para obtener los datos de un asesor mediante el idUsuario
export const obtenerAsesor = async () => {
  try {
    // Obtener el idUsuario del localStorage
    const idUsuario = localStorage.getItem("idusuario");
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}asesores/${idUsuario}`, {
      // Metodo de solicitud
      method: "GET",
      // Tipo de contenido
      headers: {
        "Content-Type": "application/json",
      },
    }); // Fin de la solicitud al backend

    // Guardar los datos en una variable
    const data = await respuesta.json();

    if (respuesta.ok) {
      // Mostrar un mensaje en caso de exito
      console.log("✅ ASESOR OBTENIDO CON EXITO");
    }

    // Retornar si se realizo la operacion y el objeto con la informacion consultada
    return {
      success: respuesta.ok,
      asesor: data.asesor[0] || null,
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL OBTENER ASESOR" + error.message);
  }
}; // Fin de la funcion obtenerAsesor

// Función para registrar un nuevo asesor
export const registrarAsesor = async ({
  nombreCompletoUsuario,
  matricula,
  emailUsuario,
  passwordUsuario,
}) => {
  try {
    const res = await fetch(`${BASE_URL}asesores/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreCompletoUsuario,
        matricula,
        emailUsuario,
        passwordUsuario,
      }),
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("❌ ERROR AL REGISTRAR AL NUEVO ASESOR: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Funcion para editar los datos de un asesor mediante el panel de admin
export const editarAsesor_panelAdmin = async ({
  idUsuario,
  nombreCompletoUsuario,
  matricula,
  emailUsuario,
  fechaNacimientoUsuario,
  direccionUsuario,
  // fotoPerfilUsuario,
  carreraAsesor,
  grupoAsesor,
  promedioAsesor,
}) => {
  try {
    const res = await fetch(`${BASE_URL}asesores/${idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuario,
        nombreCompletoUsuario,
        matriculaAsesor: matricula,
        emailUsuario,
        fechaNacimientoUsuario,
        direccionUsuario,
        // fotoPerfilUsuario,
        carreraAsesor,
        grupoAsesor,
        promedioAsesor,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ ASESOR ACTUALIZADO CON ÉXITO");
      return {
        success: true,
        mensaje: data.mensaje || "Asesor actualizado correctamente",
      };
    } else {
      console.log("❌ ERROR AL ACTUALIZAR ASESOR");
      return {
        success: false,
        mensaje: data.error || "Error al actualizar asesor",
      };
    }
  } catch (error) {
    console.log("❌ ERROR EN editarAsesorAdmin: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
}; // Fin de la funcion editarAsesorAdmin

// Modulo para testear editarAlumno
// // Funcion que solicita que se editen los datos de un alumno a el servidor
// export const editarAlumno2 = async (
//   // Pasar parametros a la funcion
//   {
//     idUsuario,
//     nombreCompletoUsuario,
//     matricula,
//     emailUsuario,
//     fechaNacimientoUsuario,
//     direccionUsuario,
//     fotoPerfilUsuario,
//     carreraAlumno,
//     grupoAlumno,
//     promedioAlumno,
//   }
// ) => {
//   try {
//     // Realizar la solicitud al backend
//     const respuesta = await fetch(`${BASE_URL}alumnos/${idUsuario}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         idUsuario,
//         nombreCompletoUsuario,
//         matriculaAlumno: matricula,
//         emailUsuario,
//         fechaNacimientoUsuario,
//         direccionUsuario,
//         fotoPerfilUsuario,
//         carreraAlumno,
//         grupoAlumno,
//         promedioAlumno,
//       }),
//     }); // Fin de la solicitud al backend

//     // Guardar la respuesta en una variable temporal en formato json
//     const data = await respuesta.json();

//     // Validar si la respuesta fue exitosa
//     if (respuesta.ok) {
//       // Acciones en caso de que la solicitud sea exitosa
//       console.log(
//         "✅ La solicitud a la base de datos para editar los datos del alumno fue exitosa"
//       );
//       return {
//         success: respuesta.ok,
//         mensaje: "Los datos del alumno se actualizaron exitosamente",
//       };
//     } else {
//       // Acciones en caso de que la solicitud falle
//       return {
//         success: false,
//         mensaje: "Se ha producido un error al actualizar los datos del alumno",
//       };
//     }
//   } catch (error) {
//     // Capturar y mostrar cualquier error que ocurra en la solicitud al backend
//     console.log(
//       "Sucedio un error atrapado por el bloque catch: " + error.message
//     );
//     return {
//       success: false,
//       mensaje: "Se ha producido un error con el backend",
//     };
//   }
// }; // Fin de la funcion editarAlumno

export const registrarNuevoAsesor = async ({
  nombreCompletoUsuario,
  matricula,
  emailUsuario,
  passwordUsuario,
}) => {
  try {
    const res = await fetch(`${BASE_URL}asesores/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreCompletoUsuario,
        matricula,
        emailUsuario,
        passwordUsuario,
      }),
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("❌ ERROR AL REGISTRAR AL NUEVO ASESOR: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};
