// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Función para iniciar sesión
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
    console.log("Error al iniciar sesión: ", error.message);
    return { success: false, mensaje: "Error de conexión con el servidor" };
  }
};

// Función para obtener todos los usuarios
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
      usuarios: data.usuarios || [],
      mensaje: data.mensaje || data.error,
    };
  } catch (error) {
    console.log("Error al mostrar usuarios: ", error.message);
    return {
      success: false,
      usuarios: [],
      mensaje: "Error de conexión con el servidor",
    };
  }
};

// Función para eliminar un usuario por ID
export const eliminarUsuario = async (idUsuario) => {
  try {
    const res = await fetch(`${BASE_URL}usuarios/eliminar/${idUsuario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return { success: res.ok, mensaje: data.mensaje || data.error };
  } catch (error) {
    console.log("Error al eliminar usuario: ", error.message);
    return { success: false, mensaje: "Error de conexión con el servidor" };
  }
};

// Función para subir imagen de perfil
export const subirImagenPerfil = async (file) => {
  try {
    if (!file) {
      return {
        success: false,
        mensaje: "No se seleccionó ningún archivo",
        error: "NO_FILE_SELECTED",
      };
    }

    // Validar tamaño de archivo (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        mensaje: "La imagen no debe exceder los 5MB",
        error: "FILE_TOO_LARGE",
      };
    }

    const formData = new FormData();
    formData.append("imagen", file);

    const res = await fetch(`${BASE_URL}usuarios/subir-imagen`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error al subir imagen:", data);
      return {
        success: false,
        mensaje: data.error || "Error al subir la imagen",
        error: data.error,
        status: res.status,
      };
    }

    return {
      success: true,
      mensaje: data.mensaje || "Imagen subida correctamente",
      urlImagen: data.url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
      error: error.message,
      status: 500,
    };
  }
};

export const verificarLoginUsuario = async ({ email, password }) => {
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
