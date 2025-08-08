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

// Función para registrar un nuevo alumno
export const registrarNuevoAlumno = async ({
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

export const editarAlumno = async (idUsuario, datosActualizados) => {
  try {
    // Validación frontend
    if (!datosActualizados.emailusuario) {
      return {
        success: false,
        mensaje: "El correo electrónico es obligatorio",
        error: "EMAIL_REQUIRED",
      };
    }

    const res = await fetch(`${BASE_URL}alumnos/${idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(datosActualizados),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error del backend:", data);
      return {
        success: false,
        mensaje: data.error || "Error al actualizar alumno",
        error: data.error,
        status: res.status,
      };
    }

    return {
      success: true,
      mensaje: data.mensaje || "Alumno actualizado correctamente",
      data: data.data,
    };
  } catch (error) {
    console.error("Error de conexión:", error);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
      error: error.message,
      status: 500,
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

// Modulo para testear editarAlumno
// Funcion que solicita que se editen los datos de un alumno a el servidor
export const editarAlumno2 = async (
  // Pasar parametros a la funcion
  {
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
  }
) => {
  try {
    // Realizar la solicitud al backend
    const respuesta = await fetch(`${BASE_URL}alumnos/${idUsuario}`, {
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
    }); // Fin de la solicitud al backend

    // Guardar la respuesta en una variable temporal en formato json
    const data = await respuesta.json();

    // Validar si la respuesta fue exitosa
    if (respuesta.ok) {
      // Acciones en caso de que la solicitud sea exitosa
      console.log(
        "✅ La solicitud a la base de datos para editar los datos del alumno fue exitosa"
      );
      return {
        success: respuesta.ok,
        mensaje: "Los datos del alumno se actualizaron exitosamente",
      };
    } else {
      // Acciones en caso de que la solicitud falle
      return {
        success: false,
        mensaje: "Se ha producido un error al actualizar los datos del alumno",
      };
    }
  } catch (error) {
    // Capturar y mostrar cualquier error que ocurra en la solicitud al backend
    console.log(
      "Sucedio un error atrapado por el bloque catch: " + error.message
    );
    return {
      success: false,
      mensaje: "Se ha producido un error con el backend",
    };
  }
}; // Fin de la funcion editarAlumno
