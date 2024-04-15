import { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import { ThemeContext } from "@/modules/themeContext";
import { useMouseVariant } from "@/modules/customMouse";

import java from "@/public/svg/java.svg";
import c from "@/public/svg/c.svg";
import cpp from "@/public/svg/cpp.svg";
import python from "@/public/svg/python.svg";
import js from "@/public/svg/js.svg";
import typescriptSVG from "@/public/svg/typescript.svg";

import react from "@/public/svg/react.svg";
import flutter from "@/public/svg/flutter.svg";
import next from "@/public/svg/nextjs.svg";
import nextLight from "@/public/svg/nextjs-light.svg";

import tailwindSVG from "@/public/svg/tailwindcss.svg";
import tailwindlight from "@/public/svg/tailwind-light.svg";
import bootstrap from "@/public/svg/bootstrap.png";

import nodejs from "@/public/svg/nodejs.svg";
import nodejsLight from "@/public/svg/nodejs-light.svg";
import php from "@/public/svg/php-light.svg";
import flask from "@/public/svg/flask.svg";
import flaskLight from "@/public/svg/flask-light.svg";
import express from "@/public/svg/expressjs.svg";
import expressLight from "@/public/svg/expressjs-light.svg";
import spring from "@/public/svg/spring.svg";

import mysql from "@/public/svg/mysql.svg";
import postgres from "@/public/svg/postgresql.svg";
import mongoDB from "@/public/svg/mongodb.svg";
import mongoDBLight from "@/public/svg/mongodb-light.svg";
import oracle from "@/public/svg/oracle.svg";

import docker from "@/public/svg/docker.svg";

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
    </motion.div>
  );
};

const Skills = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      id="skills"
      className={`mb-12 flex w-full flex-wrap items-center justify-center gap-10 px-5 sm:mb-24 sm:w-4/5 sm:px-0 lg:gap-16 xl:w-3/5 ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <SkillBadge theme={theme} svg={react} name="React.js" />
      <SkillBadge
        theme={theme}
        svg={theme === "dark" ? next : nextLight}
        name="Next.js"
      />
      <SkillBadge theme={theme} svg={flutter} name="Flutter" />
      <SkillBadge theme={theme} svg={bootstrap} name="Bootstrap" />
      <SkillBadge
        theme={theme}
        svg={theme === "dark" ? tailwindSVG : tailwindlight}
        name="TailwindCSS"
        className="h-7 w-max lg:h-10"
      />

      <SkillBadge theme={theme} svg={php} name="PHP" />
      <SkillBadge
        theme={theme}
        svg={theme === "dark" ? flask : flaskLight}
        name="Flask"
      />
      <SkillBadge
        theme={theme}
        svg={theme === "dark" ? express : expressLight}
        name="Express.js"
      />
      <SkillBadge
        theme={theme}
        svg={theme === "dark" ? nodejs : nodejsLight}
        name="Node.js"
      />
      <SkillBadge theme={theme} svg={spring} name="Spring Boot" />

      <SkillBadge theme={theme} svg={cpp} name="C++" />
      <SkillBadge theme={theme} svg={python} name="Python" />
      <SkillBadge theme={theme} svg={js} name="JavaScript" />
      <SkillBadge theme={theme} svg={c} name="C" />
      <SkillBadge theme={theme} svg={java} name="Java" />
      <SkillBadge theme={theme} svg={typescriptSVG} name="TypeScript" />

      <SkillBadge
        theme={theme}
        svg={theme === "dark" ? mongoDB : mongoDBLight}
        name="MongoDB"
      />
      <SkillBadge theme={theme} svg={mysql} name="MySQL" />
      <SkillBadge theme={theme} svg={postgres} name="PostgresSQL" />
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
