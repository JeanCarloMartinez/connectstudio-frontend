import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import { mostrarCitasPorMatriculaAlumno } from "./../../../services/cita.service";
import { obtenerAlumno } from "./../../../services/alumno.service";
import {
  obtenerEventosPoriDUsuario,
  registrarNuevoEvento,
} from "./../../../services/evento.service";

const AgendaView = () => {
  const [eventos, setEventos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const renderEvento = (info) => {
    const tipo = info.event.extendedProps?.tipo;

    return (
      <div
        className={`p-2 rounded-lg shadow-sm text-sm font-medium ${
          tipo === "nota"
            ? "bg-yellow-100 text-yellow-800 border border-yellow-400"
            : "bg-blue-100 text-blue-800 border border-blue-400"
        }`}
      >
        {info.event.title}
      </div>
    );
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const respuestaAlumno = await obtenerAlumno();
      const alumno = respuestaAlumno.alumno;
      setUsuario(alumno);

      // Cargar citas
      const respuestaCitas = await mostrarCitasPorMatriculaAlumno(
        alumno.matriculaalumno
      );
      const eventosCitas = respuestaCitas.success
        ? respuestaCitas.citas.map((cita) => ({
            title: `${cita.titulocurso} - ${cita.nombreasignatura}`,
            start: `${cita.fechaasesoria.split("T")[0]}T${
              cita.horainicioasesoria
            }`,
            end: `${cita.fechaasesoria.split("T")[0]}T${
              cita.horaterminoasesoria
            }`,
            backgroundColor: "#dbeafe",
            borderColor: "#3b82f6",
            textColor: "#1e3a8a",
            extendedProps: { ...cita },
          }))
        : [];

      // Cargar eventos del usuario
      const respuestaEventos = await obtenerEventosPoriDUsuario(
        alumno.idusuario
      );
      const eventosUsuario = respuestaEventos.success
        ? respuestaEventos.eventos.map((evento) => ({
            title: `📝 ${evento.tituloevento}`,
            start: `${evento.fechaevento}T${evento.horainicioevento}`,
            end: `${evento.fechaevento}T${evento.horaterminoevento}`,
            backgroundColor: "#fef3c7",
            borderColor: "#f59e0b",
            textColor: "#78350f",
            extendedProps: {
              tipo: "nota",
              descripcion: evento.descripcionevento,
              ...evento,
            },
          }))
        : [];

      const todosLosEventos = [...eventosCitas, ...eventosUsuario];
      console.log("📅 Eventos obtenidos:", todosLosEventos);
      setEventos(todosLosEventos);
    };

    cargarDatos();
  }, []);

  const manejarClickFecha = async (info) => {
    if (!usuario) return;

    const fecha = info.dateStr.split("T")[0];
    const hora = info.dateStr.includes("T")
      ? info.dateStr.split("T")[1].slice(0, 5)
      : "08:00";

    const { value: formValues } = await Swal.fire({
      title: "Agregar nuevo evento",
      html: `
      <input type="text" id="tituloevento" class="swal2-input" placeholder="Título del evento">
      <textarea id="descripcionevento" class="swal2-textarea" placeholder="Descripción del evento"></textarea>
      <input type="date" id="fechaevento" class="swal2-input" value="${fecha}">
      <input type="time" id="horainicioevento" class="swal2-input" value="${hora}">
      <input type="time" id="horaterminoevento" class="swal2-input" value="${hora}">
    `,
      focusConfirm: false,
      preConfirm: () => {
        const tituloevento = document
          .getElementById("tituloevento")
          .value.trim();
        const descripcionevento = document
          .getElementById("descripcionevento")
          .value.trim();
        const fechaevento = document.getElementById("fechaevento").value;
        const horainicioevento =
          document.getElementById("horainicioevento").value;
        const horaterminoevento =
          document.getElementById("horaterminoevento").value;

        if (
          !tituloevento ||
          !fechaevento ||
          !horainicioevento ||
          !horaterminoevento
        ) {
          Swal.showValidationMessage(
            "Por favor, complete todos los campos obligatorios"
          );
          return false;
        }

        if (horaterminoevento <= horainicioevento) {
          Swal.showValidationMessage(
            "La hora de término debe ser mayor que la hora de inicio"
          );
          return false;
        }

        return {
          tituloevento,
          descripcionevento,
          fechaevento,
          horainicioevento,
          horaterminoevento,
        };
      },
    });

    if (formValues) {
      const evento = {
        idusuario: usuario.idusuario,
        tituloevento: formValues.tituloevento,
        descripcionevento: formValues.descripcionevento,
        fechaevento: formValues.fechaevento,
        horainicioevento: formValues.horainicioevento,
        horaterminoevento: formValues.horaterminoevento,
      };

      const respuesta = await registrarNuevoEvento(evento);

      if (respuesta.success) {
        const nuevoEvento = {
          title: evento.tituloevento,
          start: `${evento.fechaevento}T${evento.horainicioevento}`,
          end: `${evento.fechaevento}T${evento.horaterminoevento}`,
          backgroundColor: "#dbeafe", // color para eventos normales
          borderColor: "#3b82f6",
          textColor: "#1e3a8a",
          extendedProps: {
            tipo: "evento",
            descripcion: evento.descripcionevento,
            ...evento,
          },
        };

        setEventos((prev) => [...prev, nuevoEvento]);
        Swal.fire("Evento agregado correctamente", "", "success");
      } else {
        Swal.fire("Error", respuesta.mensaje, "error");
      }
    }
  };

  const verDetallesCita = ({ event }) => {
    const datos = event.extendedProps;

    if (datos?.tipo === "nota") {
      Swal.fire({
        title: event.title,
        html: `
          <p><strong>Hora:</strong> ${event.start.toLocaleTimeString()}</p>
          <p><strong>Descripción:</strong> ${datos.descripcion}</p>
        `,
      });
    } else {
      Swal.fire({
        title: datos.titulocurso,
        html: `
          <p><strong>Asignatura:</strong> ${datos.nombreasignatura}</p>
          <p><strong>Asesor:</strong> ${datos.nombrecompletousuario}</p>
          <p><strong>Horario:</strong> ${datos.horainicioasesoria} - ${datos.horaterminoasesoria}</p>
          <p><strong>Descripción:</strong> ${datos.descripcioncurso}</p>
        `,
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Agenda</h1>
      <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          aspectRatio={1.5}
          events={eventos}
          eventClick={verDetallesCita}
          dateClick={manejarClickFecha}
          eventContent={renderEvento}
        />
      </div>
    </div>
  );
};

export default AgendaView;
