// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Obtener todos los eventos de un usuario por su ID
export const obtenerEventosPoriDUsuario = async (idUsuario) => {
  try {
    const res = await fetch(`${BASE_URL}eventos/${idUsuario}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ EVENTOS OBTENIDOS CORRECTAMENTE");
    }

    return {
      success: res.ok,
      eventos: data.eventos || [],
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.error("❌ ERROR AL OBTENER EVENTOS:", error.message);
    return {
      success: false,
      eventos: [],
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// // Registrar un nuevo evento
// export const registrarEvento = async (evento) => {
//   try {
//     const res = await fetch(`${BASE_URL}eventos/registrar`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(evento),
//     });

//     const data = await res.json();

//     return {
//       success: res.ok,
//       mensaje: data.mensaje || data.error,
//     };
//   } catch (error) {
//     console.error("❌ ERROR AL REGISTRAR EVENTO:", error.message);
//     return {
//       success: false,
//       mensaje: "Error de conexión con el servidor",
//     };
//   }
// };

// Registrar un nuevo evento
export const registrarNuevoEvento = async (evento) => {
  try {
    const res = await fetch(`${BASE_URL}eventos/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evento),
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.error("❌ ERROR AL REGISTRAR EVENTO:", error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Actualizar un evento por su idevento
export const actualizarEvento = async (idevento, evento) => {
  try {
    const res = await fetch(`${BASE_URL}eventos/${idevento}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evento),
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.error("❌ ERROR AL ACTUALIZAR EVENTO:", error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Eliminar un evento por su idevento
export const eliminarEvento = async (idevento) => {
  try {
    const res = await fetch(`${BASE_URL}eventos/${idevento}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.error("❌ ERROR AL ELIMINAR EVENTO:", error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};
