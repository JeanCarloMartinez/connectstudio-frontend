// Importar useState
import { useState } from "react";
// Importar Swal de sweet alert 2
import Swal from "sweetalert2";
// Importar funciones del servicio alumno
import { registrarAlumno } from "./../../../../services/alumno.service";
// Importar funciones del servicio asesores
import { registrarAsesor } from "./../../../../services/asesor.service";

const AuthRegisterForm = ({ onRegisterSuccess }) => {
  const [nombreCompletoUsuario, setNombreCompletoUsuario] = useState("");
  const [matricula, setMatricula] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false); // ✅ NUEVO

  const registrarNuevaCuenta = async (e) => {
    e.preventDefault();

    if (!aceptaTerminos) {
      Swal.fire({ title: "Debes aceptar los términos y condiciones." });
      return;
    }

    if (passwordUsuario !== confirmPassword) {
      Swal.fire({ title: "Las contraseñas no coinciden." });
      return;
    }

    if (tipoUsuario === "alumno") {
      Swal.fire({ title: "Registrando alumno..." });
      await registrarAlumno({
        nombreCompletoUsuario,
        matricula,
        emailUsuario,
        passwordUsuario,
      });
    } else if (tipoUsuario === "asesor") {
      Swal.fire({ title: "Registrando asesor..." });
      await registrarAsesor({
        nombreCompletoUsuario,
        matricula,
        emailUsuario,
        passwordUsuario,
      });
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
        {/* Nombre completo */}
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
            placeholder="Tu nombre completo"
            value={nombreCompletoUsuario}
            onChange={(e) => setNombreCompletoUsuario(e.target.value)}
            required
          />
        </div>

        {/* Matrícula */}
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
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>

        {/* Correo */}
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
            placeholder="tu.correo@ejemplo.com"
            value={emailUsuario}
            onChange={(e) => setEmailUsuario(e.target.value)}
            required
          />
        </div>

        {/* Contraseña */}
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
            placeholder="••••••••"
            value={passwordUsuario}
            onChange={(e) => setPasswordUsuario(e.target.value)}
            required
          />
        </div>

        {/* Confirmar contraseña */}
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
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Tipo de usuario */}
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
                checked={tipoUsuario === "alumno"}
                onChange={() => setTipoUsuario("alumno")}
              />
              <span className="ml-2 text-gray-800">Usuario</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                name="userType"
                value="asesor"
                checked={tipoUsuario === "asesor"}
                onChange={() => setTipoUsuario("asesor")}
              />
              <span className="ml-2 text-gray-800">Asesor</span>
            </label>
          </div>
        </div>

        {/* ✅ Check de términos y enlace */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={aceptaTerminos}
              onChange={() => setAceptaTerminos(!aceptaTerminos)}
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

        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg transform hover:scale-105"
        >
          Registrarme
        </button>
      </form>

      {/* Enlace a login */}
      <p className="mt-8 text-center text-gray-600 text-sm">
        ¿Ya tienes cuenta?{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline font-medium"
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("view", "Login");
            window.location.reload();
          }}
        >
          Inicia Sesión aquí
        </a>
      </p>
    </div>
  );
};

export default AuthRegisterForm;
