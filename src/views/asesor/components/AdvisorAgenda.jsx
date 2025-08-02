import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import Swal from "sweetalert2";

const AdvisorAgenda = () => {
  const [eventos, setEventos] = useState([
    { id: "1", title: "Nota: Preparar material de Álgebra", date: "2025-07-24", color: "#6366f1" },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Botón para agregar nota
  const handleAddNote = async () => {
    let fecha = selectedDate;
    if (!fecha) {
      const { value: dateStr } = await Swal.fire({
        title: "Selecciona la fecha para la nota",
        input: "date",
        inputLabel: "Fecha",
        inputValue: new Date().toISOString().slice(0, 10),
        showCancelButton: true,
        confirmButtonColor: "#6366f1",
        background: "#f3f4f6",
      });
      if (!dateStr) return;
      fecha = dateStr;
    }
    const { value: nota } = await Swal.fire({
      title: "Agregar nota educativa",
      input: "text",
      inputLabel: "Contenido de la nota",
      inputPlaceholder: "Ejemplo: Reunión con alumnos, preparar material...",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      background: "#f3f4f6",
    });
    if (nota) {
      const nuevaNota = {
        id: String(new Date().getTime()),
        title: `Nota: ${nota}`,
        date: fecha,
        color: "#6366f1", // Azul educativo
      };
      setEventos([...eventos, nuevaNota]);
      Swal.fire({
        title: "¡Nota agregada!",
        text: "Tu nota educativa se añadió al calendario.",
        icon: "success",
        confirmButtonColor: "#6366f1",
        background: "#f3f4f6",
      });
    }
    setSelectedDate(null);
  };

  // Click en fecha del calendario
  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    handleAddNote();
  };

  // Eliminar nota al hacer click en el evento
  const handleEventClick = async (clickInfo) => {
    const { isConfirmed } = await Swal.fire({
      title: clickInfo.event.title,
      text: "¿Eliminar esta nota educativa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#e11d48",
      background: "#f3f4f6",
    });
    if (isConfirmed) {
      setEventos(eventos.filter(ev => ev.id !== clickInfo.event.id));
      Swal.fire({
        title: "Eliminada",
        text: "La nota fue eliminada del calendario.",
        icon: "success",
        confirmButtonColor: "#6366f1",
        background: "#f3f4f6",
      });
    }
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <button
        className="mb-4 flex items-center text-indigo-700 hover:text-indigo-900 font-semibold"
        onClick={() => navigate("/asesor")}
        title="Regresar"
      >
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Regresar
      </button>
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 flex items-center">
        <span role="img" aria-label="agenda">📚</span> Agenda Educativa del Asesor
      </h1>
      <p className="text-indigo-600 mb-6 text-lg">Organiza tus notas y actividades académicas fácilmente.</p>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
        <button
          className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded shadow transition duration-200"
          onClick={handleAddNote}
        >
          ➕ Agregar Nota Educativa
        </button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={eventos}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          eventDisplay="block"
        />
        <div className="mt-4 text-sm text-gray-500">
          <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Haz clic en un día o usa el botón para agregar una nota educativa. Haz clic en una nota para eliminarla.</span>
        </div>
      </div>
    </div>
  );
};

export default AdvisorAgenda;