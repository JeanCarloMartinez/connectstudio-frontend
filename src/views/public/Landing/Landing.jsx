// Importar el componente HomeHero
import HomeHero from "./components/HomeHero";
// Importar el componente Testimonios
import Testimonios from "./components/Testimonios/Testimonios";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Añadir el componente HomeHero a Landing */}
      <HomeHero />
      {/* Añadir el componente Testimonios a Landing */}
      <Testimonios />
    </div>
  );
};

// Exportar el componente Landing
export default Landing;
