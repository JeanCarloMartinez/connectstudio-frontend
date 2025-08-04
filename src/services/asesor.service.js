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

// // Funcion para registrar un nuevo alumno
// export const registrarAsesor = async ({
//   // Indicar los parametros de la funcion
//   nombreCompletoUsuario,
//   matricula,
//   emailUsuario,
//   passwordUsuario,
// }) => {
//   try {
//     // Realizar la solicitud al backend
//     const respuesta = await fetch(`${BASE_URL}/asesores/signUp`, {
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
//       console.log("✅ NUEVO ASESOR REGISTRADO CON EXITO");
//     }
//   } catch (error) {
//     // Mostrar un mensaje en caso de error
//     console.log("❌ ERROR AL REGISTRAR AL NUEVO ASESOR" + error.message);
//   }
// }; // Fin de la funcion registrarAlumno

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
  fotoPerfilUsuario,
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
        fotoPerfilUsuario,
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
