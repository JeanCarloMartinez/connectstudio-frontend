import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Importar componentes de React Router para la navegación
import { Route, Routes } from "react-router-dom";
// Importar componentes de vistas
import Landing from "./views/public/Landing/Landing.jsx";

function App() {
  // Declarar variables de estado y su función para actualizarlas
  const [vistaActiva, setVistaActiva] = useState("Landing");
  // Cargar la vista guardada desde localStorage al iniciar el componente
  useEffect(() => {
    const vistaDuardada = localStorage.getItem("vistaGuardada");
    setVistaActiva(vistaDuardada || "Landing");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );

  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
