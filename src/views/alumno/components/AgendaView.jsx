// Importar useState y useEffect
import { useState, useEffect } from "react";
// Importar fullcalendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// Importar
import Swal from "sweetalert2";
// Importar funciones del servicio citas
import { mostrarCitasPorMatriculaAlumno } from "./../../../services/cita.service";
// Importar funciones del servicio alumno
import { obtenerAlumno } from "./../../../services/alumno.service";

const AgendaView = () => {
  // Declarar variables useState similar a getters y setters
  const [eventos, setEventos] = useState([]);

  // 🆕 Estado opcional para manejar notas si quieres separar visualmente
  // const [notas, setNotas] = useState([]);

  // Al cargar la pagina por primera vez, se ejecuta esta funcion
  useEffect(() => {
    // Funcion que solicita las citas al servidor
    const solicitarCitas = async () => {
      // Obtener dinamicamente los datos del alumno
      const respuestaAlumno = await obtenerAlumno();
      // Guardar los datos del alumno en una variable
      const alumno = respuestaAlumno.alumno;
      // Ejecutar la funcion pasando como parametro la matricula del alumno
      const respuesta = await mostrarCitasPorMatriculaAlumno(
        alumno.matriculaAlumno
      );

      // Validar si la respuesta fue exitosa
      if (respuesta.success) {
        // Mapear los datos para que se usen las propiedades del frontend
        const eventosFormateados = respuesta.citas.map((cita) => ({
          title: `${cita.tituloCurso} - ${cita.nombreAsignatura}`,
          start: `${cita.fechaAsesoria.split("T")[0]}T${
            cita.horaInicioAsesoria
          }`,
          end: `${cita.fechaAsesoria.split("T")[0]}T${
            cita.horaTerminoAsesoria
          }`,
          extendedProps: { ...cita },
        }));

        // Agregar el nuevo valor a eventos
        setEventos(eventosFormateados);
      }
      console.log("Datos recibidos: ", respuesta.citas);
    }; // Fin de la funcion solicitarCitas

    // Ejecutar la funcion solicitarCitas
    solicitarCitas();
  }, []);

  // 🆕 Función para agregar nota personal
  const agregarNota = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Agregar nota",
      html: `
        <input type="text" id="titulo" class="swal2-input" placeholder="Título de la nota">
        <input type="date" id="fecha" class="swal2-input">
        <input type="time" id="hora" class="swal2-input">
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
        extendedProps: {
          tipo: "nota",
          descripcion: "Nota personal agregada por el alumno.",
        },
        backgroundColor: "#facc15", // Amarillo claro (opcional)
        borderColor: "#f59e0b", // Amarillo oscuro
        textColor: "#000000", // Texto negro
      };

      setEventos((prev) => [...prev, nuevaNota]);
      Swal.fire("Nota agregada correctamente", "", "success");
    }
  };

  // 🆕 Ajuste para mostrar notas también
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
          // Eliminar nota
          const btnEliminar = document.getElementById("eliminarNota");
          if (btnEliminar) {
            btnEliminar.addEventListener("click", () => {
              Swal.close();
              setEventos((prevEventos) =>
                prevEventos.filter((e) => e !== event)
              );
              Swal.fire("Nota eliminada", "", "success");
            });
          }

          // Editar nota
          const btnEditar = document.getElementById("editarNota");
          if (btnEditar) {
            btnEditar.addEventListener("click", async () => {
              Swal.close();
              const { value: formValues } = await Swal.fire({
                title: "Editar nota",
                html: `
                <input type="text" id="titulo" class="swal2-input" placeholder="Título de la nota" value="${event.title.replace(
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

                setEventos((prevEventos) =>
                  prevEventos.map((e) => (e === event ? notaEditada : e))
                );

                Swal.fire("Nota editada correctamente", "", "success");
              }
            });
          }
        },
      });
    } else {
      Swal.fire({
        title: datos.tituloCurso,
        html: `
        <p><strong>Asignatura:</strong> ${datos.nombreAsignatura}</p>
        <p><strong>Asesor:</strong> ${datos.nombreCompletoUsuario}</p>
        <p><strong>Horario:</strong> ${datos.horaInicioAsesoria} - ${datos.horaTerminoAsesoria}</p>
        <p><strong>Descripción:</strong> ${datos.descripcionCurso}</p>
      `,
      });
    }
  }; // <- cierre de useEffect

  // ... agregarNota y verDetallesCita ya están definidos arriba ...

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mi Agenda</h1>
      <button
        onClick={agregarNota}
        className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Agregar Nota
      </button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={eventos}
        eventClick={verDetallesCita}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
      />
    </div>
  );
};

export default AgendaView;
