import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import "./App.css";

// Importar componentes de React Router para la navegación
import { Route, Routes } from "react-router-dom";

import Landing from "./views/public/Landing/Landing.jsx";
import SignUp from "./views/public/SignUp/SignUp.jsx";
import Login from "./views/public/Login/Login.jsx";
import Alumno from "./views/alumno/Alumno.jsx";
import Asesor from "./views/asesor/Asesor.jsx";
import Admin from "./views/admin/Admin.jsx";

function App() {
  const [vistaActiva, setVistaActiva] = useState("Landing");

  useEffect(() => {
    const vistaGuardada = localStorage.getItem("vistaGuardada");
    setVistaActiva(vistaGuardada || "Landing");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alumno" element={<Alumno />} />
        <Route path="/asesor" element={<Asesor />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/* Agregar el ToastContainer para que se muestren los toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
