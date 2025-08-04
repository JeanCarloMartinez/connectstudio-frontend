// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Funcion para mostrar los alumnos
export const mostrarAlumnos = async () => {
  try {
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}alumnos`, {
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
      console.log("✅ ALUMNOS OBTENIDOS CON EXITO");
    }

    // Retornar si se realizo la operacion y el objeto con la informacion consultada
    return {
      success: respuesta.ok,
      alumnos: data.alumnos || [],
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL OBTENER ALUMNOS" + error.message);
  }
}; // Fin de la funcion mostrarAlumnos

// Funcion para obtener los datos de un alumno mediante el idUsuario
export const obtenerAlumno = async () => {
  try {
    // Obtener el idUsuario del localStorage
    const idUsuario = localStorage.getItem("idusuario");
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}alumnos/${idUsuario}`, {
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
      console.log("✅ ALUMNO OBTENIDO CON EXITO");
    }

    // Retornar si se realizo la operacion y el objeto con la informacion consultada
    return {
      success: respuesta.ok,
      alumno: data.alumno[0] || null,
    };
  } catch (error) {
    // Mostrar un mensaje en caso de error
    console.log("❌ ERROR AL OBTENER ALUMNO" + error.message);
  }
}; // Fin de la funcion obtenerAlumno

// // Funcion para registrar un nuevo alumno
// export const registrarAlumno = async ({
//   // Indicar los parametros de la funcion
//   nombreCompletoUsuario,
//   matricula,
//   emailUsuario,
//   passwordUsuario,
// }) => {
//   try {
//     // Realizar la solicitud al backend
//     const respuesta = await fetch(`${BASE_URL}/alumnos/signUp`, {
//       // Metodo de solicitud
//       method: "POST",
//       // Tipo de contenido
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Pasar los datos a JSON
//       body: JSON.stringify({
//         nombreCompletoUsuario,
//         matricula,
//         emailUsuario,
//         passwordUsuario,
//       }),
//     });

//     if (respuesta.ok) {
//       // Mostrar un mensaje en caso de exito
//       console.log("✅ NUEVO ALUMNO REGISTRADO CON EXITO");
//     }
//   } catch (error) {
//     // Mostrar un mensaje en caso de error
//     console.log("❌ ERROR AL REGISTRAR AL NUEVO ALUMNO" + error.message);
//   }
// }; // Fin de la funcion registrarAlumno

// Función para registrar un nuevo alumno
export const registrarAlumno = async ({
  nombreCompletoUsuario,
  matricula,
  emailUsuario,
  passwordUsuario,
}) => {
  try {
    const res = await fetch(`${BASE_URL}alumnos/registrar`, {
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
    console.log("❌ ERROR AL REGISTRAR AL NUEVO ALUMNO: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// // funcion para editar los datos de un alumno mediante idUsuario
// export const editarAlumno = async ({
//   // Parámetros que se enviarán para la actualización
//   idUsuario,
//   nombreCompletoUsuario,
//   matricula,
//   emailUsuario,
//   fechaNacimientoUsuario,
//   direccionUsuario,
//   passwordUsuario,
// }) => {
//   try {
//     // Realizar la solicitud PUT al backend con el idUsuario en la URL
//     const respuesta = await fetch(`${BASE_URL}/alumnos/${idUsuario}`, {
//       method: "PUT", // Método para actualizar recursos
//       headers: {
//         "Content-Type": "application/json", // Indicar que se envía JSON
//       },
//       // Convertir los datos en formato JSON para enviarlos en el body
//       body: JSON.stringify({
//         nombreCompletoUsuario,
//         matricula,
//         emailUsuario,
//         fechaNacimientoUsuario,
//         direccionUsuario,
//         passwordUsuario,
//       }),
//     });

//     // Validar si la respuesta fue exitosa
//     if (respuesta.ok) {
//       // Mostrar mensaje en caso de éxito
//       console.log("✅ ALUMNO ACTUALIZADO CON ÉXITO");
//       return { success: true };
//     } else {
//       // Mostrar mensaje en caso de error en la actualización
//       console.log("❌ ERROR AL ACTUALIZAR ALUMNO");
//       return { success: false };
//     }
//   } catch (error) {
//     // Capturar y mostrar cualquier error ocurrido durante la petición
//     console.log("❌ ERROR EN editarAlumno: " + error.message);
//     return { success: false };
//   }
// }; // Fin de la funcion editarAlumno
export const editarAlumno = async ({
  nombreCompletoUsuario,
  matricula,
  emailUsuario,
  fechaNacimientoUsuario,
  direccionUsuario,
  fotoPerfilUsuario,
  carreraAlumno,
  grupoAlumno,
  promedioAlumno,
}) => {
  fotoPerfilUsuario =
    "https://static.displate.com/857x1200/displate/2023-06-01/223be9f8eccefa8cc09e5de8495b3719_44285b86c3c11293120f7be853096240.jpg"; // Asignar una imagen por defecto si no se proporciona una
  try {
    // Obtener el idUsuario del localStorage
    const idUsuario = localStorage.getItem("idusuario");
    const res = await fetch(`${BASE_URL}alumnos/${idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreCompletoUsuario,
        matricula,
        emailUsuario,
        fechaNacimientoUsuario,
        direccionUsuario,
        fotoPerfilUsuario,
        carreraAlumno,
        grupoAlumno,
        promedioAlumno,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ ALUMNO ACTUALIZADO CON ÉXITO");
      return {
        success: true,
        mensaje: data.mensaje || "Alumno actualizado correctamente",
      };
    } else {
      console.log("❌ ERROR AL ACTUALIZAR ALUMNO");
      return {
        success: false,
        mensaje: data.error || "Error al actualizar alumno",
      };
    }
  } catch (error) {
    console.log("❌ ERROR EN editarAlumno: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Funcion para editar los datos de un alumno mediante el panel de admin
export const editarAlumno_panelAdmin = async ({
  idUsuario,
  nombreCompletoUsuario,
  matricula,
  emailUsuario,
  fechaNacimientoUsuario,
  direccionUsuario,
  fotoPerfilUsuario,
  carreraAlumno,
  grupoAlumno,
  promedioAlumno,
}) => {
  try {
    const res = await fetch(`${BASE_URL}alumnos/${idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuario,
        nombreCompletoUsuario,
        matriculaAlumno: matricula,
        emailUsuario,
        fechaNacimientoUsuario,
        direccionUsuario,
        fotoPerfilUsuario,
        carreraAlumno,
        grupoAlumno,
        promedioAlumno,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ ALUMNO ACTUALIZADO CON ÉXITO");
      return {
        success: true,
        mensaje: data.mensaje || "Alumno actualizado correctamente",
      };
    } else {
      console.log("❌ ERROR AL ACTUALIZAR ALUMNO");
      return {
        success: false,
        mensaje: data.error || "Error al actualizar alumno",
      };
    }
  } catch (error) {
    console.log("❌ ERROR EN editarAlumnoAdmin: " + error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
}; // Fin de la funcion editarAlumnoAdmin
