import ScrollOpacity from "@/common/components/ScrollOpacity";

import Project from "./Project";

const ProjectsList = () => {
  return (
    <section
      className="mt-36 flex w-screen justify-center md:mt-0"
      id="projects"
    >
      <ScrollOpacity>
        <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
          <Project
            title="SCanteen Mobile App"
            description="Our transformative app optimizes the student canteen experience, eliminating waiting times and enabling paperless, cashless transactions for
seamless convenience."
            github="https://github.com/vijaisuria/Canteen-App"
            demo="nil"
          />
          <Project
            title="MIT Health Center"
            description="A robust web application powered by the MERN stack and beautifully styled with Tailwind CSS. Streamline the management of our college health center."
            github="https://github.com/vijaisuria/MIT-HC"
            demo="https://health-center.vercel.app/team"
          />
          <Project
            title="Multi-State Co-operative Society Management System"
            description="A MERN Stack application with comphrensive dashboard and admin panel"
            github="https://github.com/vijaisuria/mern-admin-frontend"
            demo="https://mern-admin-frontend-vijaisuria.vercel.app/"
          />
          <Project
            title="E-medical Management Sysytem"
            description="A complete website to provide medical services mainly during tough
time like COVID-19 by online mode."
            demo="https://emedicals.000webhostapp.com/"
            github="https://github.com/vijaisuria/emedicals"
          />
          <Project
            title="Tower of Hanoi"
            description="Experience the classic Tower of Hanoi game implemented in C++, challenging your strategic thinking and problem-solving skills."
            github="https://github.com/vijaisuria/Tower-of-Hanoi"
            demo="https://vijaisuria.github.io/Tower-of-Hanoi/"
          />
          <Project
            title="My-Personal-Website"
            description="Explore my personal portfolio website, powered by Tailwind CSS and Next.js, showcasing my projects, skills, and achievements, reflecting my unique digital presence."
            github="https://github.com/vijaisuria/"
            demo="https://vijaisuria.github.io"
            scrollTo
          />
        </div>

        <p className="mt-10 px-10 text-center text-2xl">
          For more projects checkout my{" "}
          <a
            className="text-gradient hover:hover-gradient"
            href="https://github.com/vijaisuria"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          .
        </p>
      </ScrollOpacity>
    </section>
  );
};

export default ProjectsList;
