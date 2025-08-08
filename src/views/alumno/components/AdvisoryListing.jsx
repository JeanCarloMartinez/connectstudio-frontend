// Importar useState y useEffect
import { useState, useEffect } from "react";
// Importar funciones del servicio curso
import { mostrarCursos } from "./../../../services/curso.service";

const AdvisoryListing = ({ onSelectAdvisory }) => {
  // Declarar variables useState similar a getters y setters
  const [mockAdvisories, setMockAdvisories] = useState([]); // Estado para cursos
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");

  // Al cargar la pagina por primera vez, se ejecuta esta funcion
  useEffect(() => {
    // Funcion que solicita los cursos al servidor
    const solicitarCursos = async () => {
      const respuesta = await mostrarCursos();
      // Validar si la respuesta fue exitosa
      if (respuesta.success) {
        // Mapear los datos para que se usen las propiedades del frontend
        const cursosFormateados = respuesta.cursos.map((curso) => ({
          id: curso.idcurso,
          name: curso.titulocurso,
          subject: curso.nombreasignatura,
          description: curso.descripcioncurso || "Sin descripción",
          rating: curso.valoracioncurso,
          nombreCompleto: curso.nombrecompletousuario,
          content: curso.descripcioncurso || "Sin descripción",
        }));
        console.log("Cursos formateados:", cursosFormateados);

        setMockAdvisories(cursosFormateados);
      }
    }; // Fin de la funcion solicitarCursos

    // Ejecutar la funcion solicitarCursos
    solicitarCursos();
  }, []);

  // Funcion para filtrar las asesorias
  const filteredAdvisories = mockAdvisories.filter((advisory) => {
    const matchesSearch =
      advisory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advisory.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advisory.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      filterSubject === "all" || advisory.subject === filterSubject;
    const matchesLevel =
      filterLevel === "all" || advisory.level === filterLevel;
    return matchesSearch && matchesSubject && matchesLevel;
  });

  const subjects = [...new Set(mockAdvisories.map((a) => a.subject))];

  // Inicializar modo para nuevas funciones ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const advisoriesPerPage = 9;

  // Calcular el índice de asesorías a mostrar
  const indexOfLastAdvisory = currentPage * advisoriesPerPage;
  const indexOfFirstAdvisory = indexOfLastAdvisory - advisoriesPerPage;
  const currentAdvisories = filteredAdvisories.slice(
    indexOfFirstAdvisory,
    indexOfLastAdvisory
  );

  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredAdvisories.length / advisoriesPerPage);

  // Finalizar modulo para nuevas funciones ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Asesorías Disponibles
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre o materia..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="all">Todas las Materias</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl border ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {currentAdvisories.length > 0 ? (
            currentAdvisories.map((advisory) => (
              <div
                key={advisory.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {advisory.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-1">
                    {advisory.subject}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {advisory.description}
                  </p>
                  <div className="flex items-center text-yellow-500 mb-4">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-gray-700 font-semibold">
                      {advisory.rating}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectAdvisory(advisory)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Solicitar Asesoría
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg col-span-full text-center">
              No se encontraron asesorías con los filtros aplicados.
            </p>
          )}
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAdvisories.length > 0 ? (
            currentAdvisories.map((advisory) => (
              <div
                key={advisory.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {advisory.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-1">
                  {advisory.subject}
                </p>{" "}
                <p className="text-gray-600 text-sm mb-3">
                  {advisory.description}
                </p>
                <div className="flex items-center text-yellow-500 mb-4">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="text-gray-700 font-semibold">
                    {advisory.rating}
                  </span>
                </div>
                <button
                  onClick={() => onSelectAdvisory(advisory)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Solicitar Asesoría
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg col-span-full text-center">
              No se encontraron asesorías con los filtros aplicados.
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default AdvisoryListing;
