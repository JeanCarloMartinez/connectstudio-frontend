// Url base para consultas al servidor desde variable de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Función para mostrar materiales por curso
export const mostrarMaterialesPorCurso = async (idCurso) => {
  try {
    const res = await fetch(`${BASE_URL}materiales/curso/${idCurso}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      materiales: data.materiales || [],
    };
  } catch (error) {
    console.log("Error al mostrar materiales: " + error.message);
    return { success: false, mensaje: "Error de conexión con el servidor" };
  }
};

// Función para registrar material
export const registrarMaterial = async (material) => {
  try {
    const res = await fetch(`${BASE_URL}materiales/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(material),
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || "Error al registrar material",
    };
  } catch (error) {
    console.log("Error al registrar material: " + error.message);
    return { success: false, mensaje: "Error de conexión con el servidor" };
  }
};

// Función para eliminar material
export const eliminarMaterial = async (idMaterial) => {
  try {
    const res = await fetch(`${BASE_URL}materiales/${idMaterial}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || "Error al eliminar material",
    };
  } catch (error) {
    console.log("Error al eliminar material: " + error.message);
    return { success: false, mensaje: "Error de conexión con el servidor" };
  }
};

// 📄 Función para subir un archivo PDF y registrar el material
export const subirMaterialPdf = async ({ file, tituloMaterial, idCurso }) => {
  try {
    if (!file) {
      return {
        success: false,
        mensaje: "No se seleccionó ningún archivo",
      };
    }

    // Validación básica: tipo de archivo
    if (file.type !== "application/pdf") {
      return {
        success: false,
        mensaje: "El archivo debe ser un PDF",
      };
    }

    const formData = new FormData();
    formData.append("archivo", file);
    formData.append("tituloMaterial", tituloMaterial);
    formData.append("idCurso", idCurso);

    const res = await fetch(`${BASE_URL}materiales/subir`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return {
      success: res.ok,
      mensaje: data.mensaje || "Material subido correctamente",
      url: data.url,
    };
  } catch (error) {
    console.error("Error al subir material PDF:", error.message);
    return {
      success: false,
      mensaje: "Error de conexión con el servidor",
    };
  }
};
