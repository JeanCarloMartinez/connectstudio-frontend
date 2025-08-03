import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import { mostrarCitasPorMatriculaAlumno } from "./../../../services/cita.service";
import { obtenerAlumno } from "./../../../services/alumno.service";

const AgendaView = () => {
  const [eventos, setEventos] = useState([]);

  // Render personalizado del contenido de eventos
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
    const solicitarCitas = async () => {
      const respuestaAlumno = await obtenerAlumno();
      const alumno = respuestaAlumno.alumno;
      const respuesta = await mostrarCitasPorMatriculaAlumno(
        alumno.matriculaalumno
      );

      if (respuesta.success) {
        const eventosFormateados = respuesta.citas.map((cita) => ({
          title: `${cita.titulocurso} - ${cita.nombreasignatura}`,
          start: `${cita.fechaasesoria.split("T")[0]}T${
            cita.horainicioasesoria
          }`,
          end: `${cita.fechaasesoria.split("T")[0]}T${
            cita.horaterminoasesoria
          }`,
          backgroundColor: "#dbeafe", // azul claro
          borderColor: "#3b82f6", // azul
          textColor: "#1e3a8a",
          extendedProps: { ...cita },
        }));
        setEventos(eventosFormateados);
      }
    };

    solicitarCitas();
  }, []);

  const manejarClickFecha = async (info) => {
    const fecha = info.dateStr.split("T")[0];
    const hora = info.dateStr.includes("T")
      ? info.dateStr.split("T")[1].slice(0, 5)
      : "08:00";

    const { value: formValues } = await Swal.fire({
      title: "Agregar nota",
      html: `
        <input type="text" id="titulo" class="swal2-input" placeholder="Título de la nota">
        <input type="date" id="fecha" class="swal2-input" value="${fecha}">
        <input type="time" id="hora" class="swal2-input" value="${hora}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const titulo = document.getElementById("titulo").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        if (!titulo || !fecha || !hora) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }
        return { titulo, fecha, hora };
      },
    });

    if (formValues) {
      const nuevaNota = {
        title: `📝 ${formValues.titulo}`,
        start: `${formValues.fecha}T${formValues.hora}`,
        end: `${formValues.fecha}T${formValues.hora}`,
        backgroundColor: "#fef3c7",
        borderColor: "#f59e0b",
        textColor: "#78350f",
        extendedProps: {
          tipo: "nota",
          descripcion: "Nota personal agregada por el alumno.",
        },
      };

      setEventos((prev) => [...prev, nuevaNota]);
      Swal.fire("Nota agregada correctamente", "", "success");
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
          <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
            <button id="editarNota" class="swal2-confirm swal2-styled" style="background-color: #2563eb;">Editar</button>
            <button id="eliminarNota" class="swal2-cancel swal2-styled" style="background-color: #dc2626;">Eliminar</button>
          </div>
        `,
        showConfirmButton: false,
        didOpen: () => {
          document
            .getElementById("eliminarNota")
            ?.addEventListener("click", () => {
              Swal.close();
              setEventos((prev) => prev.filter((e) => e !== event));
              Swal.fire("Nota eliminada", "", "success");
            });

          document
            .getElementById("editarNota")
            ?.addEventListener("click", async () => {
              Swal.close();
              const { value: formValues } = await Swal.fire({
                title: "Editar nota",
                html: `
                <input type="text" id="titulo" class="swal2-input" value="${event.title.replace(
                  "📝 ",
                  ""
                )}">
                <input type="date" id="fecha" class="swal2-input" value="${
                  event.start.toISOString().split("T")[0]
                }">
                <input type="time" id="hora" class="swal2-input" value="${event.start
                  .toTimeString()
                  .slice(0, 5)}">
              `,
                focusConfirm: false,
                preConfirm: () => {
                  const titulo = document.getElementById("titulo").value;
                  const fecha = document.getElementById("fecha").value;
                  const hora = document.getElementById("hora").value;
                  if (!titulo || !fecha || !hora) {
                    Swal.showValidationMessage(
                      "Todos los campos son obligatorios"
                    );
                    return false;
                  }
                  return { titulo, fecha, hora };
                },
              });

              if (formValues) {
                const notaEditada = {
                  ...event,
                  title: `📝 ${formValues.titulo}`,
                  start: `${formValues.fecha}T${formValues.hora}`,
                  end: `${formValues.fecha}T${formValues.hora}`,
                };
                setEventos((prev) =>
                  prev.map((e) => (e === event ? notaEditada : e))
                );
                Swal.fire("Nota editada correctamente", "", "success");
              }
            });
        },
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
          eventContent={renderEvento} // 👈 se usa este renderizador
        />
      </div>
    </div>
  );
};

export default AgendaView;
