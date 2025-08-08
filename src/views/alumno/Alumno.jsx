import React, { useState } from "react";
import LayoutHeader from "./components/LayoutHeader";
import HomeDashboard from "./components/HomeDashboard";
import AdvisoryListing from "./components/AdvisoryListing";
import UserProfile from "./components/UserProfile";
import MessageInbox from "./components/MessageInbox";
import AdvisoryDetail from "./components/AdvisoryDetail";
import StudentProfileView from "./components/StudentProfileView";
import AgendaView from "./components/AgendaView";
import RewardsDashboard from "./components/RewardsDashboard";
import MyAdvisoriesList from "./components/MyAdvisoriesList";
import CourseBoard from "./components/CourseBoard"; // Importar la nueva vista
import MateriasView from "./components/MateriasView";

function Alumno() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedAdvisory, setSelectedAdvisory] = useState(null);
  const [viewedStudent, setViewedStudent] = useState(null);
  // const [currentCourseId, setCurrentCourseId] = useState(null); // Estado para el ID del curso
  const [currentView, setCurrentView] = useState("home"); // Estado para la vista actual

  const mockStudents = [
    {
      id: 1,
      name: "Juan Pérez",
      level: "Preparatoria",
      bio: "Estudiante dedicado con interés en ciencias exactas. Me gusta ayudar a mis compañeros a entender conceptos complejos.",
      subjects: ["Matemáticas", "Física"],
      rating: 4.8,
      profileImage: "https://via.placeholder.com/150/FF5733/FFFFFF?text=JP",
    },
    {
      id: 2,
      name: "María García",
      level: "Universidad",
      bio: "Apasionada por la historia y la literatura. Ofrezco asesorías en estas áreas y disfruto del intercambio de conocimientos.",
      subjects: ["Historia", "Literatura"],
      rating: 4.5,
      profileImage: "https://via.placeholder.com/150/33FF57/FFFFFF?text=MG",
    },
  ];

  const navigateTo = (page) => {
    setCurrentPage(page);
    setSelectedAdvisory(null);
    setViewedStudent(null);
    // setCurrentCourseId(null); // Resetear el ID del curso al cambiar de página
  };

  const handleSelectAdvisory = (advisory) => {
    setSelectedAdvisory(advisory);
    setCurrentPage("advisoryDetail");
  };

  const handleBackToList = () => {
    setSelectedAdvisory(null);
    setCurrentPage("advisories");
  };

  const handleJoinAdvisory = (advisory) => {
    alert(
      `Te has unido a la asesoría de ${advisory.subject} con ${advisory.name}. ¡Revisa tus mensajes para coordinar!`
    );
    navigateTo("messages");
  };

  const handleViewStudentProfile = (studentId) => {
    const student = mockStudents.find((s) => s.id === studentId);
    setViewedStudent(student);
    setCurrentPage("studentProfileView");
  };

  const handleGoToCourseBoard = (advisory) => {
    setSelectedAdvisory(advisory); // 👈 guarda el advisory antes de cambiar de vista
    setCurrentView("courseBoard");
    setSelectedAdvisory(advisory); // Guarda el objeto completo
    setCurrentPage("courseBoard");
  };

  const handleBackToMyAdvisories = () => {
    // setCurrentCourseId(null);
    setCurrentPage("myAdvisories");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeDashboard onNavigate={navigateTo} />;
      case "advisories":
        return (
          <AdvisoryListing
            onNavigate={navigateTo}
            onSelectAdvisory={handleSelectAdvisory}
          />
        );
      case "advisoryDetail":
        return (
          <AdvisoryDetail
            advisory={selectedAdvisory}
            onBackToList={handleBackToList}
            onJoinAdvisory={handleJoinAdvisory}
          />
        );
      case "profile":
        return <UserProfile onNavigate={navigateTo} />;
      case "messages":
        return <MessageInbox onNavigate={navigateTo} />;
      case "studentProfileView":
        return (
          <StudentProfileView student={viewedStudent} onNavigate={navigateTo} />
        );
      case "agenda":
        return <AgendaView onNavigate={navigateTo} />;
      case "rewards":
        return <RewardsDashboard onNavigate={navigateTo} />;
      case "myAdvisories":
        return (
          <MyAdvisoriesList
            onNavigate={navigateTo}
            onGoToCourseBoard={handleGoToCourseBoard}
          />
        );
      case "courseBoard":
        return (
          <CourseBoard
            advisory={selectedAdvisory} // pasa el objeto completo
            onBackToMyAdvisories={handleBackToMyAdvisories}
          />
        );

      case "materias":
        return <MateriasView />;
      default:
        return <HomeDashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <LayoutHeader currentPage={currentPage} onNavigate={navigateTo} />
      <main>{renderPage()}</main>
    </div>
  );
}

export default Alumno;
