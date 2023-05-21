import ScrollOpacity from '@/common/components/ScrollOpacity';

import Project from './Project';

const ProjectsList = () => {
  return (
    <section
      className="mt-36 flex w-screen justify-center md:mt-0"
      id="projects"
    >
      <ScrollOpacity>
        <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
          <Project
            title="gnpaone/Naveen-Personal-Website"
            description="My personal website."
            github="https://github.com/gnpaone/Naveen-Personal-Website"
            demo="https://gnpaone.github.io"
            scrollTo
          />
          <Project
            title="gnpaone/Naveen-Personal-Website"
            description="My personal website."
            github="https://github.com/gnpaone/Naveen-Personal-Website"
            demo="https://gnpaone.github.io"
          />
          <Project
            title="gnpaone/Naveen-Personal-Website"
            description="My personal website."
            github="https://github.com/gnpaone/Naveen-Personal-Website"
            demo="https://gnpaone.github.io"
          />
          <Project
            title="gnpaone/Naveen-Personal-Website"
            description="My personal website."
            github="https://github.com/gnpaone/Naveen-Personal-Website"
          />
          <Project
            title="gnpaone/Naveen-Personal-Website"
            description="My personal website."
            github="https://github.com/gnpaone/Naveen-Personal-Website"
            demo="https://gnpaone.github.io"
          />
          <Project
            title="gnpaone/Naveen-Personal-Website"
            description="My personal website."
            github="https://github.com/gnpaone/Naveen-Personal-Website"
            demo="https://gnpaone.github.io"
          />
        </div>

        <p className="mt-10 px-10 text-center text-2xl">
          For more projects checkout my{' '}
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
