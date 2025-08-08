const Testimonio = ({ titulo, descipcion, nombre, imagen }) => {
  // Renderizar el componente Testimonio
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between h-full">
      <p className="text-lg text-blue-800 mb-6 italic leading-relaxed">
        "{descipcion}"
      </p>

      <div className="flex items-center mt-auto">
        <img
          src={imagen}
          alt={nombre}
          className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500 shadow-md"
        />
        <div>
          <p className="font-bold text-blue-900 text-lg">{nombre}</p>
          <p className="text-blue-600 text-sm">{titulo}</p>
        </div>
      </div>
    </div>
  );
};

// Exportar el componente Testimonio
export default Testimonio;
