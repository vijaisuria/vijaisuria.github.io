import { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import { ThemeContext } from "@/modules/themeContext";
import { useMouseVariant } from "@/modules/customMouse";
import expressSVG from "@/public/svg/express.svg";
import mongoDBSVG from "@/public/svg/mongodb.svg";
import nextSVG from "@/public/svg/nextjs.svg";
import nodeSVG from "@/public/svg/nodejs.svg";
import reactSVG from "@/public/svg/react.svg";
import flutter from "@/public/svg/flutter.svg";
import mysql from "@/public/svg/mysql.svg";
import tailwindSVG from "@/public/svg/tailwindcss.svg";
import typescriptSVG from "@/public/svg/typescript.svg";
import docker from "@/public/svg/docker.svg";
import js from "@/public/svg/js.svg";
import php from "@/public/svg/php.svg";
import oracle from "@/public/svg/oracle.svg";
import flask from "@/public/svg/flask.svg";

const SkillBadge = ({
  svg,
  name,
  className,
}: {
  svg: StaticImageData;
  name: string;
  className?: string;
  theme: "dark" | "light";
}) => {
  const { setMouseVariant } = useMouseVariant();
  const { theme } = useContext(ThemeContext);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svgPaths = svgRef.current.querySelectorAll("path");
      svgPaths.forEach((path) => {
        path.style.fill = theme === "dark" ? "#FFFFFF" : "#000000";
      });
    }
  }, [theme]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={svg}
        alt={name}
        className={className || "h-10 w-max md:h-12 lg:h-16"}
        priority
        onMouseEnter={() => setMouseVariant.technology(name)}
        onMouseLeave={setMouseVariant.default}
      />
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="hidden"
        ref={svgRef}
      >
        <motion.path d={svg.src} />
      </motion.svg>
    </motion.div>
  );
};

const Skills = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`mb-12 flex w-full flex-wrap items-center justify-center gap-10 px-5 sm:mb-24 sm:w-4/5 sm:px-0 lg:gap-16 xl:w-3/5 ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <SkillBadge theme={theme} svg={typescriptSVG} name="TypeScript" />
      <SkillBadge theme={theme} svg={nextSVG} name="Next.js" />
      <SkillBadge theme={theme} svg={reactSVG} name="React.js" />
      <SkillBadge theme={theme} svg={flutter} name="Flutter" />
      <SkillBadge theme={theme} svg={flask} name="Flask" />
      <SkillBadge theme={theme} svg={expressSVG} name="Express.js" />
      <SkillBadge theme={theme} svg={nodeSVG} name="Node.js" />
      <SkillBadge theme={theme} svg={mongoDBSVG} name="MongoDB" />
      <SkillBadge theme={theme} svg={js} name="JavaScript" />
      <SkillBadge theme={theme} svg={php} name="PHP" />
      <SkillBadge
        theme={theme}
        svg={tailwindSVG}
        name="TailwindCSS"
        className="h-7 w-max lg:h-10"
      />
      <SkillBadge theme={theme} svg={mysql} name="MySQL" />
      <SkillBadge theme={theme} svg={oracle} name="Oracle" />
      <SkillBadge
        theme={theme}
        svg={docker}
        name="docker"
        className="h-7 w-max lg:h-10"
      />
    </div>
  );
};

export default Skills;
