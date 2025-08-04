// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const registrarUsuario = async ({
  nombre,
  matricula,
  email,
  password,
  tipoUsuario,
}) => {
  try {
    const res = await fetch("http://localhost:3000/usuarios/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, matricula, email, password, tipoUsuario }),
    });

    const data = await res.json();
    return { success: res.ok, mensaje: data.mensaje || data.error };
  } catch (error) {
    console.log("Error al registrar usuario: " + error.message);
    return { success: false, mensaje: "Error de conexion con el servidor" };
  }
};

export const loginUsuario = async ({ email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (error) {
    console.log("Error al iniciar sesión: " + error.message);
    return { success: false, mensaje: "Error de conexión con el servidor" };
  }
};

// Funcion para mostrar los usuarios
export const mostrarUsuarios = async () => {
  try {
    const res = await fetch(`${BASE_URL}usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      usuarios: data.usuarios || [], // CORREGIDO
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("Error al mostrar usuarios: ", error.message);
    return {
      success: false,
      usuarios: [],
      mensaje: "Error de conexion con el servidor",
    };
  }
};

// Funcion para eliminar usuario por id
export const eliminarUsuario = async (idUsuario) => {
  try {
    const res = await fetch(`${BASE_URL}usuarios/eliminar${idUsuario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return { success: res.ok, mensaje: data.mensaje || data.error };
  } catch (error) {
    console.log("Error al eliminar usuario: ", error.message);
    return { success: false, mensaje: "Error de conexion con el servidor" };
  }
};
