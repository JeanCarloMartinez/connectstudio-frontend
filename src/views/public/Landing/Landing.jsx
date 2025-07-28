// Importar el componente HomeHero
import HomeHero from "./components/HomeHero";

const Landing = () => {
  return (
    <div className="landing">
      <HomeHero />
      <h1>Welcome to the Landing Page</h1>
      <p>This is the public landing page of our application.</p>
      <p>Feel free to explore and learn more about what we offer!</p>
    </div>
  );
};

export default Landing;
