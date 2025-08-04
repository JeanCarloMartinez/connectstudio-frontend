import React, { useState } from "react";
import Swal from "sweetalert2";

const EnrollStudentPage = ({ students, courses }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleEnroll = () => {
    if (!selectedStudent || !selectedCourse) {
      Swal.fire(
        "Campos incompletos",
        "Selecciona un alumno y un curso",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: "¿Confirmar inscripción?",
      text: `Inscribir a ${selectedStudent} en el curso ${selectedCourse}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, inscribir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí iría la lógica real de inscripción
        Swal.fire(
          "Inscrito",
          "El alumno ha sido inscrito correctamente",
          "success"
        );
        setSelectedStudent("");
        setSelectedCourse("");
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Inscribir Alumno
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Seleccionar Alumno
          </label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          >
            <option value="">Selecciona un alumno</option>
            {students.map((student) => (
              <option key={student.id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Seleccionar Curso
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          >
            <option value="">Selecciona un curso</option>
            {courses.map((course) => (
              <option key={course.idcurso} value={course.idcurso}>
                {course.titulocurso}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleEnroll}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Inscribir Alumno
      </button>
    </div>
  );
};

export default EnrollStudentPage;
