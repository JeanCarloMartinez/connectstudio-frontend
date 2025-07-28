// Importar textos estaticos desde strings.json
import strings from "./../../../../data/strings.json";

const HomeHero = () => {
  // Desestructurar los textos del componente HomeHero
  const { titulo, descipcion, signUpButton, loginButton } = strings.HomeHero;

  // Renderizar el componente HomeHero
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight mb-6 drop-shadow-md">
          {titulo}
        </h1>
        <p className="text-lg md:text-xl text-blue-800 max-w-3xl mx-auto mb-10 leading-relaxed">
          {descipcion}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => {
              localStorage.setItem("view", "SignUp");
              window.location.reload();
            }}
          >
            {signUpButton}
          </button>
          <button
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            onClick={() => {
              localStorage.setItem("view", "Login");
              window.location.reload();
            }}
          >
            {loginButton}
          </button>
        </div>
      </div>

      {/* Imágenes de estudio y asesorías entre alumnos con un toque más profesional */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-blue-200 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-full h-48 bg-gradient-to-t from-blue-200 to-transparent opacity-50 transform rotate-180"></div>

      {/* Imágenes de estudio y asesorías entre alumnos */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <img
          src="https://via.placeholder.com/200x150/A7C7E7/FFFFFF?text=Estudio+Profesional"
          alt="Estudiante estudiando"
          className="rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300 border-2 border-blue-300"
        />
      </div>
      <div className="absolute top-1/4 right-8 hidden md:block">
        <img
          src="https://via.placeholder.com/220x160/C3B1E1/FFFFFF?text=Asesoría+Académica"
          alt="Asesoría entre pares"
          className="rounded-xl shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300 border-2 border-indigo-300"
        />
      </div>
      <div className="absolute bottom-1/4 left-1/4 hidden md:block">
        <img
          src="https://via.placeholder.com/180x130/E0BBE4/FFFFFF?text=Colaboración+Educativa"
          alt="Colaboración de alumnos"
          className="rounded-xl shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300 border-2 border-purple-300"
        />
      </div>
    </section>
  );
};

export default HomeHero;
