import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { BiGlobe } from "react-icons/bi";
import { FaSchool } from "react-icons/fa";

export const experiencesData = [
  {
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2021 - present",
  },
] as const;

export const educationData = [
  {
    title: "B.E Computer Science",
    institute: "MIT, Anna University",
    location: "Chennai, India",
    grade: "CGPA: 9.59/10",
    achievement:
      "A perennial top 10 achiever, consistently excelling in academic pursuits.",
    icon: React.createElement(LuGraduationCap),
    date: " Oct'2021 - Jul'2025",
  },
  {
    title: "Professional Full Stack Software Developer",
    institute: "IBM certified, Coursera",
    location: null,
    grade: "Grade: 100%",
    achievement:
      "Mastered IBM-backed Full Stack skills for top-tier developer roles like Application and Cloud Developer.",
    icon: React.createElement(BiGlobe),
    date: " Nov'2023 - Present",
  },
  {
    title: "Higher Secondary Course",
    institute: "Muthamizhl Higher Secondary School",
    location: "Salem, TN-India",
    grade: "Percentage: 98%",
    achievement:
      "Secured preeminence as the District-Level First Rank Achiever",
    icon: React.createElement(FaSchool),
    date: "2019 - 2021",
  },
  {
    title: "SSLC",
    institute: "Muthamizhl Higher Secondary School",
    location: "Salem, TN-India",
    grade: "Percentage: 96.4%",
    achievement: "Achieved top honor as school's first-rank holder.",
    icon: React.createElement(FaSchool),
    date: "2018-2019",
  },
] as const;
