import { toast } from "react-toastify";

// Función de validación en tiempo real (limpia y alerta)
export const validarNombre = (valor) => {
  const validacion = valor.replace(/[^a-zA-ZÁÉÍÓÚáéíóúÑñ\s]/g, "");
  if (valor !== validacion) {
    toast.warn("Solo se permiten letras y espacios en el nombre.");
  }
  return validacion.slice(0, 100); // máximo 100 caracteres
};

export const validarMatricula = (valor) => {
  const validacion = valor.replace(/[^0-9]/g, "");
  if (valor !== validacion) {
    toast.warn("Solo se permiten números en la matrícula.");
  }
  return validacion.slice(0, 8); // máximo 8 dígitos
};

export const validarEmail = (valor) => {
  const validacion = valor.replace(/[^a-zA-Z0-9@._-]/g, "");
  if (valor !== validacion) {
    toast.warn("Email inválido: caracteres no permitidos.");
  }
  return validacion.slice(0, 254); // máximo 254 caracteres
};

// Validaciones finales (usadas antes de enviar datos)
export const validarFinalNombre = (nombre) =>
  /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{5,100}$/.test(nombre.trim());

export const validarFinalMatricula = (matricula) => /^\d{8}$/.test(matricula);

export const validarFinalEmail = (email) =>
  email.length >= 6 &&
  email.length <= 254 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validarFinalContrasena = (contrasena) =>
  /^.{8,64}$/.test(contrasena);
