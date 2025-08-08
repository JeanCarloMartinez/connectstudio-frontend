import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importar funciones para el registro de usuarios
import { registrarNuevoAlumno } from "./../../../../services/alumno.service";
import { registrarNuevoAsesor } from "./../../../../services/asesor.service";
import { verificarLoginUsuario } from "./../../../../services/usuario.service"; // Importar función de login

import { toast } from "react-toastify";

// Importar funciones de validación
import {
  validarNombre,
  validarMatricula,
  validarEmail,
  validarFinalNombre,
  validarFinalMatricula,
  validarFinalEmail,
} from "./../../../../utils/signUp";

const AuthRegisterForm = ({ onRegisterSuccess }) => {
  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [terminosCondiciones, setTerminosCondiciones] = useState(false);

  const navigate = useNavigate();

  const registrarNuevaCuenta = async (e) => {
    e.preventDefault();

    if (!validarFinalNombre(nombre)) {
      toast.warn(
        "Nombre inválido. Solo letras y espacios (mínimo 2, máximo 50)."
      );
      return;
    }

    if (!validarFinalMatricula(matricula)) {
      toast.warn("La matrícula debe tener exactamente 8 dígitos numéricos.");
      return;
    }

    if (!validarFinalEmail(email)) {
      toast.warn("Correo electrónico inválido.");
      return;
    }

    if (!terminosCondiciones) {
      toast.error("Debes aceptar los términos y condiciones.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    if (!tipo) {
      toast.error("Selecciona si eres alumno o asesor.");
      return;
    }

    try {
      if (tipo === "alumno") {
        toast.info("Registrando alumno...");
        await registrarNuevoAlumno({
          nombreCompletoUsuario: nombre,
          matricula,
          emailUsuario: email,
          passwordUsuario: password,
        });
      } else if (tipo === "asesor") {
        toast.info("Registrando asesor...");
        await registrarNuevoAsesor({
          nombreCompletoUsuario: nombre,
          matricula,
          emailUsuario: email,
          passwordUsuario: password,
        });
      }

      // Iniciar sesión automáticamente después del registro
      const { success, data } = await verificarLoginUsuario({
        email,
        password,
      });

      if (success) {
        localStorage.setItem(
          "idusuario",
          JSON.stringify(data.usuario.idusuario)
        );
        const tipoUsuario = data.usuario.tipousuario;

        if (tipoUsuario === "alumno") navigate("/alumno");
        else if (tipoUsuario === "asesor") navigate("/asesor");

        if (onRegisterSuccess) onRegisterSuccess();
      } else {
        toast.error("Registro exitoso pero falló el inicio de sesión.");
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro.");
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Regístrate en Connect Studio
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Crea tu cuenta para empezar a aprender o enseñar.
      </p>

      <form onSubmit={registrarNuevaCuenta}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Miguel Bernal Montes"
            value={nombre}
            onChange={(e) => setNombre(validarNombre(e.target.value))}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="matricula"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Matrícula
          </label>
          <input
            type="text"
            id="matricula"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="00000000"
            value={matricula}
            onChange={(e) => setMatricula(validarMatricula(e.target.value))}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="tu.correo@example.com"
            value={email}
            onChange={(e) => setEmail(validarEmail(e.target.value))}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="**********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Tipo de Usuario
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                name="userType"
                value="alumno"
                checked={tipo === "alumno"}
                onChange={() => setTipo("alumno")}
              />
              <span className="ml-2 text-gray-800">Estudiante</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                name="userType"
                value="asesor"
                checked={tipo === "asesor"}
                onChange={() => setTipo("asesor")}
              />
              <span className="ml-2 text-gray-800">Asesor Académico</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={terminosCondiciones}
              onChange={() => setTerminosCondiciones(!terminosCondiciones)}
            />
            <span className="ml-2 text-gray-700 text-sm">
              Acepto los{" "}
              <a
                href="./../../../../../terminos-y-politicas-de-privacidad.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Términos y Políticas de Privacidad
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg transform hover:scale-105"
        >
          Registrarme
        </button>
      </form>

      <p className="mt-8 text-center text-gray-600 text-sm">
        ¿Ya tienes cuenta?{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline font-medium"
          onClick={() => {
            navigate("/login");
          }}
        >
          Inicia Sesión aquí
        </a>
      </p>
    </div>
  );
};

export default AuthRegisterForm;
