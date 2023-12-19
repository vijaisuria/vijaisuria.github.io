import { useEffect } from "react";

import About from "@/modules/about";
import Emeds from "@/modules/emeds";
import Contact from "@/modules/contact";
import CustomMouse from "@/modules/customMouse";
import Hero from "@/modules/hero";
import ProjectsList from "@/modules/projects";
import Experience from "@/modules/experience";

export default function HomePage() {
  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0, 0);
    };

    window.onunload = scrollTop;
  }, []);

  return (
    <>
      <CustomMouse />

      <Hero />

      <About />

      <div className="md:h-[30vh]" />

      <ProjectsList />

      <Experience />

      <Contact />
    </>
  );
}
