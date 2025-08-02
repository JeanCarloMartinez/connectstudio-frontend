// Importar el componente Testimonio
import Testimonio from "./components/Testimonio";
// Importar textos estaticos desde strings.json
import strings from "./../../../../../data/strings.json";

const Testimonios = () => {
  // Renderizar el componente Testimonios
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-12 drop-shadow-md">
          Lo que dicen nuestros estudiantes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strings.Landing.Testimonios.listaTestimonios.map(
            (testimonio, index) => (
              <Testimonio
                key={index}
                titulo={testimonio.titulo}
                descipcion={testimonio.descipcion}
                nombre={testimonio.nombre}
                imagen={testimonio.imagen}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

// Exportar el componente Testimonios
export default Testimonios;
