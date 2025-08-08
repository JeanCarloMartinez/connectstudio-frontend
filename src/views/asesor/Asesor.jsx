import React, { useState, useEffect } from "react";
import AdvisorLayout from "./components/AdvisorLayout";
import AdvisorDashboard from "./components/AdvisorDashboard";
import AdvisorCourses from "./components/AdvisorCourses";
import AdvisorAdvisories from "./components/AdvisorAdvisories";
import AdvisorProfile from "./components/AdvisorProfile";
import AdvisorWelcome from "./components/AdvisorWelcome";
import AdvisorAgenda from "./components/AdvisorAgenda";
// Importar funciones del servicio asesor
import { obtenerAsesor } from "./../../services/asesor.service";
// Importar funciones del servicio curso
import { mostrarCursosPorMatricula } from "./../../services/curso.service";

function Asesor() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [selectedAdvisory, setSelectedAdvisory] = useState(null);
  const [advisories, setAdvisories] = useState([]);
  const [matriculaAsesor, setMatriculaAsesor] = useState(null);

  useEffect(() => {
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) return;

    obtenerAsesor(idUsuario).then(({ success, asesor }) => {
      if (success && asesor?.matricula) {
        setMatriculaAsesor(asesor.matricula);

        mostrarCursosPorMatricula(asesor.matricula).then(
          ({ success, cursos }) => {
            if (success) setAdvisories(cursos);
          }
        );
      }
    });
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "welcome":
        return <AdvisorWelcome onNavigate={navigateTo} />; // ✅ aquí
      case "dashboard":
        return <AdvisorDashboard onNavigate={navigateTo} />;
      case "courses":
        return <AdvisorCourses />;
      case "advisories":
        return <AdvisorAdvisories />;
      case "profile":
        return <AdvisorProfile />;
      case "agenda":
        return <AdvisorAgenda onNavigate={navigateTo} />;
      default:
        return <AdvisorWelcome onNavigate={navigateTo} />; // ✅ también aquí
    }
  };

  const handleCreateNewAdvisory = (newAdvisory) => {
    setAdvisories([...advisories, newAdvisory]);
    navigateTo("misAsesorias");
  };

  let content;
  switch (currentPage) {
    case "dashboard":
      content = <AdvisorDashboard onNavigate={navigateTo} />;
      break;
    case "misAsesorias":
      content = (
        <MyAdvisories advisories={advisories} onNavigate={navigateTo} />
      );
      break;
    case "perfil":
      content = <AdvisorProfile onBack={() => navigateTo("dashboard")} />;
      break;
    case "createActivity":
      content = (
        <CreateAdvisoryForm
          onBack={() => navigateTo("dashboard")}
          matriculaAsesor={matriculaAsesor}
        />
      );
      break;
    case "createAdvisory":
      content = (
        <CreateAdvisoryForm
          onCreateAdvisory={handleCreateNewAdvisory}
          onBack={() => navigateTo("dashboard")}
          matriculaAsesor={matriculaAsesor}
        />
      );
      break;
    case "agenda":
      return <AdvisorAgenda onNavigate={navigateTo} />;
    case "manageAdvisory":
      content = (
        <ManageAdvisory
          advisory={selectedAdvisory}
          onBack={() => navigateTo("misAsesorias")}
        />
      );
      break;
    default:
      content = <AdvisorDashboard onNavigate={navigateTo} />;
  }

  return <AdvisorLayout onNavigate={navigateTo}>{renderPage()}</AdvisorLayout>;
}

export default Asesor;
