import React, { useState, useEffect, useRef } from "react";
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

// Servicios
import { mostrarAlumnos } from "./../../services/alumno.service";
import { mostrarAsesores } from "./../../services/asesor.service";
import {
  mostrarUsuarios,
  eliminarUsuario,
} from "./../../services/usuario.service";
import { mostrarCursos } from "./../../services/curso.service";
import { registrarAdmin } from "./../../services/admin.service";
import { registrarAlumno } from "./../../services/alumno.service";
import { registrarAsesor } from "./../../services/asesor.service";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState("students");
  const [students, setStudents] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [users, setUsers] = useState([]);
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

  // Nuevo estado para dropdown
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const addDropdownRef = useRef(null);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const response = await mostrarAlumnos();
      if (response.success) {
        const alumnosFormateados = response.alumnos.map((alumno) => ({
          id: alumno.idusuario,
          name: alumno.nombrecompletousuario,
          matricula: alumno.matriculaalumno,
          email: alumno.emailusuario,
          direccion: alumno.direccionusuario || "No especificado",
          promedio: alumno.promedioalumno || "No especificado",
          carrera: alumno.carreraalumno || "No especificado",
          group: alumno.grupoalumno || "No especificado",
          fechaNacimiento: alumno.fechanacimientousuario || "No especificado",
          role: alumno.tipousuario,
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
      if (response.success) {
        const asesoresFormateados = response.asesores.map((asesor) => ({
          id: asesor.idusuario,
          name: asesor.nombrecompletousuario,
          matricula: asesor.matriculaasesor,
          email: asesor.emailusuario,
          direccion: asesor.direccionusuario || "No especificado",
          promedio: asesor.promedioasesor || "No especificado",
          carrera: asesor.carreraasesor || "No especificado",
          group: asesor.grupoasesor || "No especificado",
          fechaNacimiento: asesor.fechanacimientousuario || "No especificado",
          role: asesor.tipousuario,
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
    if (response.usuarios && Array.isArray(response.usuarios)) {
      const usuariosFormateados = response.usuarios.map((usuario) => ({
        id: usuario.idusuario,
        name: usuario.nombrecompletousuario,
        email: usuario.emailusuario,
        role: usuario.tipousuario,
        direccion: usuario.direccionusuario || "No especificado",
        fechaNacimiento: usuario.fechanacimientousuario || "No especificado",
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
        Swal.fire("Eliminado", res.mensaje, "success").then(() => {
          fetchUsuarios();
          window.location.reload();
        });
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

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addDropdownRef.current &&
        !addDropdownRef.current.contains(event.target)
      ) {
        setIsAddDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddNewClick = () => {
    setIsAddDropdownOpen((prev) => !prev);
  };

  const handleRegisterOption = (role) => {
    setIsAddDropdownOpen(false);

    if (role === "Alumno" || role === "Asesor" || role === "Administrador") {
      Swal.fire({
        title: `Registrar ${role}`,
        html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre completo" />
        ${
          role !== "Administrador"
            ? `<input id="matricula" class="swal2-input" placeholder="Matrícula" />`
            : ""
        }
        <input id="email" type="email" class="swal2-input" placeholder="Correo electrónico" />
        <input id="password" type="password" class="swal2-input" placeholder="Contraseña" />
      `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        preConfirm: () => {
          const nombre = Swal.getPopup().querySelector("#nombre").value.trim();
          const matricula =
            role !== "Administrador"
              ? Swal.getPopup().querySelector("#matricula").value.trim()
              : null;
          const email = Swal.getPopup().querySelector("#email").value.trim();
          const password = Swal.getPopup().querySelector("#password").value;

          if (!nombre) {
            Swal.showValidationMessage("El nombre es obligatorio");
            return false;
          }
          if (role !== "Administrador" && !matricula) {
            Swal.showValidationMessage("La matrícula es obligatoria");
            return false;
          }
          if (!email) {
            Swal.showValidationMessage("El correo electrónico es obligatorio");
            return false;
          }
          if (!password) {
            Swal.showValidationMessage("La contraseña es obligatoria");
            return false;
          }

          return { nombre, matricula, email, password };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (role === "Administrador") {
              // Llamar a tu servicio registrarAdmin importado
              const response = await registrarAdmin({
                nombreCompletoUsuario: result.value.nombre,
                emailUsuario: result.value.email,
                passwordUsuario: result.value.password,
              });

              if (response.success) {
                Swal.fire(
                  "¡Registrado!",
                  "Administrador registrado correctamente.",
                  "success"
                );
                // Puedes refrescar la lista de usuarios si quieres:
                fetchUsuarios();
              } else {
                Swal.fire(
                  "Error",
                  response.mensaje || "Error al registrar administrador",
                  "error"
                );
              }
            } else if (role === "Asesor") {
              // Llamar a tu servicio registrarAdmin importado
              const response = await registrarAsesor({
                nombreCompletoUsuario: result.value.nombre,
                matricula: result.value.matricula,
                emailUsuario: result.value.email,
                passwordUsuario: result.value.password,
              });

              if (response.success) {
                Swal.fire(
                  "¡Registrado!",
                  "Asesor registrado correctamente.",
                  "success"
                );
                // Puedes refrescar la lista de usuarios si quieres:
                fetchUsuarios();
              } else {
                Swal.fire(
                  "Error",
                  response.mensaje || "Error al registrar asesor",
                  "error"
                );
              }
            } else if (role === "Alumno") {
              // Llamar a tu servicio regisatrarAlumno importado
              const response = await registrarAlumno({
                nombreCompletoUsuario: result.value.nombre,
                matricula: result.value.matricula,
                emailUsuario: result.value.email,
                passwordUsuario: result.value.password,
              });

              if (response.success) {
                Swal.fire(
                  "¡Registrado!",
                  "Alumno registrado correctamente.",
                  "success"
                );
                // Puedes refrescar la lista de usuarios si quieres:
                fetchUsuarios();
              } else {
                Swal.fire(
                  "Error",
                  response.mensaje || "Error al registrar alumno",
                  "error"
                );
              }
            } else {
              // Aquí el manejo para Alumno y Asesor (si ya tienes la API, haz su llamada similar)
              Swal.fire(
                "¡Registrado!",
                `${role} registrado correctamente.`,
                "success"
              );
            }
          } catch (error) {
            Swal.fire(
              "Error",
              "Error inesperado al registrar usuario",
              "error"
            );
            console.error("Error al registrar:", error);
          }
        }
      });
    }
  };

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
                  key={student.id}
                  user={student}
                  type="Alumno"
                  onEdit={() =>
                    handleEditUser({ ...student, role: "Estudiante" })
                  }
                  onViewDetails={() =>
                    handleViewUserDetails({ ...student, role: "Estudiante" })
                  }
                  onDelete={() => handleDeleteUser(student.id)}
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
                  onDelete={() => handleDeleteUser(advisor.id)}
                />
              ))}
            </div>
          </>
        );
      case "users":
        return (
          <>
            <div className="flex items-center justify-between relative">
              <AdminSectionTitle
                title="Gestión de Usuarios"
                description="Accede a la lista completa de todos los usuarios de la plataforma."
              />
              <div className="relative" ref={addDropdownRef}>
                <button
                  title="Add New"
                  className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                  onClick={handleAddNewClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    className="stroke-blue-400 fill-none group-hover:fill-blue-800 group-active:stroke-blue-200 group-active:fill-blue-600 group-active:duration-0 duration-300"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      strokeWidth="1.5"
                    ></path>
                    <path d="M8 12H16" strokeWidth="1.5"></path>
                    <path d="M12 16V8" strokeWidth="1.5"></path>
                  </svg>
                </button>

                {/* Dropdown */}
                {isAddDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                      onClick={() => handleRegisterOption("Administrador")}
                    >
                      Registrar Administrador
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                      onClick={() => handleRegisterOption("Asesor")}
                    >
                      Registrar Asesor
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                      onClick={() => handleRegisterOption("Alumno")}
                    >
                      Registrar Alumno
                    </button>
                  </div>
                )}
              </div>
            </div>

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
