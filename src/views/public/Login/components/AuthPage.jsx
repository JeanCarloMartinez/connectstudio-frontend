import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthFormContainer from "./AuthFormContainer";
import { loginUsuario } from "../../../../services/usuario.service";
// import { capitalizar } from "./../../../../utils/textoUtils";

// Importar useNavigate desde react-router-dom para navegar entre rutas
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  // Crear una instancia de useNavigate para redirigir a otras rutas
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { success, data, mensaje } = await loginUsuario({ email, password });

    if (success) {
      console.log("Inicio de sesión exitoso:", data);
      console.log("tu eres un :", data.usuario.tipousuario);
      if (data.usuario.tipousuario === "alumno") {
        navigate("/alumno");
      } else if (data.usuario.tipousuario === "asesor") {
        navigate("/asesor");
      } else if (data.usuario.tipousuario === "admin") {
        navigate("/admin");
      }

      localStorage.setItem("idusuario", JSON.stringify(data.usuario.idusuario));
    } else {
      console.log("Error al iniciar sesión:", mensaje || data?.error);
    }
  };

  const handleRecoverPasswordSubmit = (e) => {
    e.preventDefault();
    const message = `Solicitando recuperación de contraseña para el correo: ${email}`;
    alert(message);
    // Aquí iría la lógica real de recuperación de contraseña
    setIsRecoveringPassword(false); // Vuelve a la vista de login después de enviar
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center p-4">
      <AuthFormContainer
        title={
          isRecoveringPassword
            ? "Recuperar Contraseña"
            : "¡Bienvenido de vuelta!"
        }
        subtitle={
          isRecoveringPassword
            ? "Ingresa tu correo para restablecerla."
            : "Inicia sesión para continuar tu aventura."
        }
      >
        {isRecoveringPassword ? (
          <form onSubmit={handleRecoverPasswordSubmit}>
            <AuthInput
              id="email"
              type="email"
              label="Correo electrónico"
              placeholder="tu.correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthButton type="submit" text="Enviar enlace de recuperación" />
            <p className="text-center text-gray-600 mt-6 text-sm">
              <button
                onClick={() => setIsRecoveringPassword(false)}
                className="text-blue-600 font-semibold hover:underline ml-1 focus:outline-none"
              >
                Volver al inicio de sesión
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <AuthInput
              id="email"
              type="email"
              label="Correo electrónico"
              placeholder="tu.correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AuthInput
              id="password"
              type="password"
              label="Contraseña"
              placeholder="Tu contraseña secreta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <AuthButton type="submit" text="Iniciar Sesión" />

            <p className="text-center text-gray-600 mt-6 text-sm">
              <button
                onClick={() => setIsRecoveringPassword(true)}
                className="text-blue-600 font-semibold hover:underline focus:outline-none"
              >
                Olvidé mi contraseña
              </button>
            </p>
            <p className="mt-8 text-center text-gray-600 text-sm">
              ¿No tienes una cuenta?{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Regístrate aquí
              </a>
            </p>
          </form>
        )}
      </AuthFormContainer>
    </div>
  );
};

export default AuthPage;
