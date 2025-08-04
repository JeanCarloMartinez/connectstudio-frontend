import React, { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminUserCard from "./components/AdminUserCard";
import AdminSectionTitle from "./components/AdminSectionTitle";
import AdminInput from "./components/AdminInput";
import AdminButton from "./components/AdminButton";
import AdminEditUserModal from "./components/AdminEditUserModal";
import AdminUserDetailsModal from "./components/AdminUserDetailsModal";
import AdminProfileView from "./components/AdminProfileView";
import AdminEditProfileModal from "./components/AdminEditProfileModal";
import CoursesPage from "./components/CoursesPage";
import ClassroomsPage from "./components/ClassroomsPage";
import SubjectsPage from "./components/SubjectsPage";
import EnrollStudentPage from "./components/EnrollStudentPage";

import Swal from "sweetalert2";

// Servicio para obtener alumnos desde backend
import { mostrarAlumnos } from "./../../services/alumno.service";
// Servicio para obtener asesores desde backend
import { mostrarAsesores } from "./../../services/asesor.service";
// Servicio para obtener y eliminar usuarios desde backend
import {
  mostrarUsuarios,
  eliminarUsuario,
} from "./../../services/usuario.service";
// Servicio para obtener cursos desde backend
import { mostrarCursos } from "./../../services/curso.service";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState("students");
  const [students, setStudents] = useState([]); // Estado para alumnos
  const [advisors, setAdvisors] = useState([]); // Estado para asesores
  const [users, setUsers] = useState([]); // Estado para usuarios
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedClassroomAssign, setSelectedClassroomAssign] = useState("");
  const [selectedAdvisorGroup, setSelectedAdvisorGroup] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [advisorSearchTerm, setAdvisorSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditAdminProfileModalOpen, setIsEditAdminProfileModalOpen] =
    useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToView, setUserToView] = useState(null);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const response = await mostrarAlumnos();
      console.log("Datos recibidos:", response.alumnos); // <-- Aquí
      if (response.success) {
        // Mapea los datos para que tengan las propiedades que usas
        const alumnosFormateados = response.alumnos.map((alumno) => ({
          id: alumno.idusuario, // usa idUsuario para el id
          name: alumno.nombrecompletousuario, // nombre completo
          email: alumno.emailusuario, // email
          group: alumno.grupousuario || "", // grupo o vacío si es null
        }));
        setStudents(alumnosFormateados);
      } else {
        console.error("Error al cargar alumnos:", response.mensaje);
      }
    };

    fetchAlumnos();
  }, []);

  useEffect(() => {
    const fetchAsesores = async () => {
      const response = await mostrarAsesores();
      console.log("Datos recibidos asesores:", response.asesores);
      if (response.success) {
        const asesoresFormateados = response.asesores.map((asesor) => ({
          id: asesor.idusuario,
          name: asesor.nombrecompletousuario,
          email: asesor.emailusuario,
        }));
        setAdvisors(asesoresFormateados);
      } else {
        console.error("Error al cargar asesores:", response.mensaje);
      }
    };

    fetchAsesores();
  }, []);

  const fetchUsuarios = async () => {
    const response = await mostrarUsuarios();
    console.log("Datos recibidos usuarios:", response.usuarios);

    // Aquí cambia la condición igual que en los otros:
    if (response.usuarios && Array.isArray(response.usuarios)) {
      const usuariosFormateados = response.usuarios.map((usuario) => ({
        id: usuario.idusuario,
        name: usuario.nombrecompletousuario,
        email: usuario.emailusuario,
        role: usuario.tipousuario,
      }));
      setUsers(usuariosFormateados);
    } else {
      console.error(
        "Error al cargar usuarios:",
        response.mensaje || "No hay usuarios"
      );
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Ejecutar una sola vez al montar el componente
  useEffect(() => {
    const solicitarCursos = async () => {
      const respuesta = await mostrarCursos();
      if (respuesta.success) {
        setCourses(respuesta.cursos);
      }
    };

    solicitarCursos();
  }, []);

  const [adminUser, setAdminUser] = useState({
    id: "ADMIN001",
    name: "Admin Principal",
    email: "admin@asesorias.com",
    role: "Administrador",
    lastLogin: "2023-10-27 10:30 AM",
  });

  const classrooms = ["Aula 101", "Laboratorio B", "Salón de Usos Múltiples"];
  const groups = ["Grupo A", "Grupo B", "Grupo C"];

  const handleDeleteUser = async (idUsuario) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const res = await eliminarUsuario(idUsuario);
      if (res.success) {
        Swal.fire("Eliminado", res.mensaje, "success");

        // Recarga los usuarios para actualizar la lista
        if (res.success) {
          Swal.fire("Eliminado", res.mensaje, "success").then(() => {
            fetchUsuarios();
            window.location.reload();
          });
        }
      } else {
        Swal.fire("Error", res.mensaje, "error");
      }
    }
  };

  const handleAssignClassroom = () => {
    alert(`Asignando ${selectedClassroomAssign} a ${selectedStudent}`);
    setSelectedStudent("");
    setSelectedClassroomAssign("");
  };

  const handleAssignAdvisorToGroup = () => {
    alert(`Asignando ${selectedAdvisor} al ${selectedAdvisorGroup}`);
    setSelectedAdvisor("");
    setSelectedAdvisorGroup("");
  };

  const handleClearStudentFilters = () => {
    setStudentSearchTerm("");
  };

  const handleClearAdvisorFilters = () => {
    setAdvisorSearchTerm("");
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleViewUserDetails = (user) => {
    setUserToView(user);
    setIsDetailsModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    if (updatedUser.role === "Estudiante") {
      setStudents(
        students.map((s) => (s.id === updatedUser.id ? updatedUser : s))
      );
      setUsers(
        users.map((u) =>
          u.id === updatedUser.id && u.role === "Estudiante" ? updatedUser : u
        )
      );
    } else if (updatedUser.role === "Asesor") {
      setAdvisors(
        advisors.map((a) => (a.id === updatedUser.id ? updatedUser : a))
      );
      setUsers(
        users.map((u) =>
          u.id === updatedUser.id && u.role === "Asesor" ? updatedUser : u
        )
      );
    } else {
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    }
    setIsEditModalOpen(false);
    setUserToEdit(null);
  };

  const handleEditAdminProfile = () => {
    setIsEditAdminProfileModalOpen(true);
  };

  const handleSaveAdminProfile = (updatedAdmin) => {
    setAdminUser(updatedAdmin);
    setIsEditAdminProfileModalOpen(false);
  };

  // Filtrar alumnos por nombre, email o grupo
  const filteredStudents = students.filter((student) => {
    const name = student.name || "";
    const email = student.email || "";
    const group = student.group || "";

    return (
      name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      email.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      group.toLowerCase().includes(studentSearchTerm.toLowerCase())
    );
  });

  // Filtrar asesores por nombre o email
  const filteredAdvisors = advisors.filter(
    (advisor) =>
      (advisor.name || "")
        .toLowerCase()
        .includes(advisorSearchTerm.toLowerCase()) ||
      (advisor.email || "")
        .toLowerCase()
        .includes(advisorSearchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (currentPage) {
      case "students":
        return (
          <>
            <AdminSectionTitle
              title="Connect Studio"
              description="Visualiza y administra todos los alumnos registrados en la plataforma."
            />
            <div className="flex items-end gap-4 mb-6">
              <div className="flex-grow">
                <AdminInput
                  label="Buscar Alumno"
                  type="text"
                  placeholder="Buscar por nombre, email o grupo..."
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                />
              </div>
              <AdminButton onClick={handleClearStudentFilters} type="secondary">
                Limpiar Filtros
              </AdminButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <AdminUserCard
                  key={student.id} // no uses índice, usa el id único
                  user={student}
                  type="Alumno"
                  onEdit={() =>
                    handleEditUser({ ...student, role: "Estudiante" })
                  }
                  onViewDetails={() =>
                    handleViewUserDetails({ ...student, role: "Estudiante" })
                  }
                  onDelete={() => {
                    handleDeleteUser(student.id);
                  }}
                />
              ))}
            </div>
          </>
        );
      case "advisors":
        return (
          <>
            <AdminSectionTitle
              title="Gestión de Asesores"
              description="Revisa y gestiona la información de los asesores disponibles."
            />
            <div className="flex items-end gap-4 mb-6">
              <div className="flex-grow">
                <AdminInput
                  label="Buscar Asesor"
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={advisorSearchTerm}
                  onChange={(e) => setAdvisorSearchTerm(e.target.value)}
                />
              </div>
              <AdminButton onClick={handleClearAdvisorFilters} type="secondary">
                Limpiar Filtros
              </AdminButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdvisors.map((advisor) => (
                <AdminUserCard
                  key={advisor.id}
                  user={advisor}
                  type="Asesor"
                  onEdit={() => handleEditUser({ ...advisor, role: "Asesor" })}
                  onViewDetails={() =>
                    handleViewUserDetails({ ...advisor, role: "Asesor" })
                  }
                  onDelete={() => {
                    handleDeleteUser(advisor.id);
                  }}
                />
              ))}
            </div>
          </>
        );
      case "users":
        return (
          <>
            <AdminSectionTitle
              title="Gestión de Usuarios"
              description="Accede a la lista completa de todos los usuarios de la plataforma."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <AdminUserCard
                  key={user.id}
                  user={user}
                  type={user.role}
                  onEdit={() => handleEditUser(user)}
                  onViewDetails={() => handleViewUserDetails(user)}
                  onDelete={() => handleDeleteUser(user.id)}
                />
              ))}
            </div>
          </>
        );
      case "courses":
        return (
          <>
            <AdminSectionTitle
              title="Gestión de Cursos"
              description="Administra los cursos de la plataforma: consulta, edita o elimina información."
            />
            <CoursesPage />
          </>
        );
      case "classrooms":
        return (
          <>
            <AdminSectionTitle
              title="Gestión de Aulas"
              description="Consulta y administra las aulas disponibles para asignar a los estudiantes."
            />
            <ClassroomsPage />
          </>
        );
      case "subjects":
        return (
          <>
            <AdminSectionTitle
              title="Gestión de Asignaturas"
              description="Edita, visualiza o elimina asignaturas registradas en la plataforma."
            />
            <SubjectsPage />
          </>
        );
      case "enroll":
        return (
          <>
            <AdminSectionTitle
              title="Inscribir Alumno a Curso"
              description="Asigna cursos a los alumnos de forma sencilla y rápida."
            />
            <EnrollStudentPage students={students} courses={courses} />
          </>
        );

      // case "classrooms":
      //   return (
      //     <>
      //       <AdminSectionTitle
      //         title="Asignación de Aulas"
      //         description="Asigna aulas a los alumnos de manera eficiente."
      //       />
      //       <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
      //         <h3 className="text-2xl font-semibold text-gray-800 mb-6">
      //           Asignar Aula a Alumno
      //         </h3>
      //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      //           <div>
      //             <label className="block text-gray-700 text-sm font-medium mb-2">
      //               Seleccionar Alumno
      //             </label>
      //             <select
      //               value={selectedStudent}
      //               onChange={(e) => setSelectedStudent(e.target.value)}
      //               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
      //             >
      //               <option value="">Selecciona un alumno</option>
      //               {students.map((student) => (
      //                 <option key={student.id} value={student.name}>
      //                   {student.name}
      //                 </option>
      //               ))}
      //             </select>
      //           </div>
      //           <div>
      //             <label className="block text-gray-700 text-sm font-medium mb-2">
      //               Seleccionar Aula
      //             </label>
      //             <select
      //               value={selectedClassroomAssign}
      //               onChange={(e) => setSelectedClassroomAssign(e.target.value)}
      //               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
      //             >
      //               <option value="">Selecciona un aula</option>
      //               {classrooms.map((classroom) => (
      //                 <option key={classroom} value={classroom}>
      //                   {classroom}
      //                 </option>
      //               ))}
      //             </select>
      //           </div>
      //         </div>
      //         <AdminButton onClick={handleAssignClassroom}>
      //           Asignar Aula
      //         </AdminButton>
      //       </div>
      //     </>
      //   );
      case "profile":
        return (
          <AdminProfileView
            adminUser={adminUser}
            onEditProfile={handleEditAdminProfile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 ml-64">
        <AdminHeader
          title={
            currentPage === "students"
              ? "Connect Studio"
              : currentPage.charAt(0).toUpperCase() +
                currentPage.slice(1).replace(/([A-Z])/g, " $1")
          }
        />
        <main className="p-8 pt-28">{renderContent()}</main>
      </div>
      {isEditModalOpen && (
        <AdminEditUserModal
          user={userToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
      {isDetailsModalOpen && (
        <AdminUserDetailsModal
          user={userToView}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
      {isEditAdminProfileModalOpen && (
        <AdminEditProfileModal
          adminUser={adminUser}
          onClose={() => setIsEditAdminProfileModalOpen(false)}
          onSave={handleSaveAdminProfile}
        />
      )}
    </div>
  );
};

export default Admin;
