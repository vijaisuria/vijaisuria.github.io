import AboutHeader from "./components/Header";
import Intro from "./components/Intro";
import Skills from "./components/Skills";

const AboutSkills = () => {
  return (
    <section id="about" className="mb-48 lg:mb-0">
      <div className="min-h-screen">
        <AboutHeader />
      </div>

      <div className="flex flex-col items-center">
        <Skills />

        <Intro />
      </div>
    </section>
  );
};

export default AboutSkills;
