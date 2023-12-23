import { useContext } from "react";
import { motion } from "framer-motion";

import Header from "./components/Header";
import ScrollIndicator from "./components/ScrollIndicator";
import { ThemeContext } from "@/modules/themeContext";

const Hero = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const trans = {
    type: "spring",
    damping: 10,
    mass: 0.75,
    stiffness: 100,
  };
  const vRotate = {
    dark: {
      rotate: 40,
    },
    light: {
      rotate: 90,
    },
  };
  const vLine = {
    dark: {
      scale: 0,
      opacity: 0,
    },
    light: {
      scale: 1,
      opacity: 1,
    },
  };
  // maskedCircle
  const vMCircle = {
    dark: {
      cx: 12,
      cy: 4,
    },
    light: {
      cx: 30,
      cy: 0,
    },
  };
  // centerCircle
  const vCCircle = {
    dark: {
      r: 9,
    },
    light: {
      r: 5,
    },
  };

  return (
    <section
      className={`relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden ${
        theme === "dark" ? "dark" : "light"
      }`}
      id="hero"
    >
      <motion.div
        className={`absolute top-8 flex items-center gap-5 font-sans text-lg md:gap-10 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.65 }}
      >
        <div className="h-px bg-zinc-600 sm:w-36 md:w-48 lg:w-72" />
        <button
          onClick={() =>
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="scale-btn"
        >
          Projects
        </button>
        <a
          className="scale-btn"
          href="pdf/Vijaisuria_resume.pdf"
          target="_blank"
        >
          Resume
        </a>
        <button
          onClick={() =>
            document
              .getElementById("education")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="scale-btn"
        >
          Education
        </button>
        <button
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="scale-btn"
        >
          Contact
        </button>
        <div className="h-px bg-zinc-600 sm:w-36 md:w-48 lg:w-72" />
      </motion.div>

      <div className="flex w-max flex-1 flex-col">
        <div className="flex h-[55%] items-end">
          <Header />
        </div>

        <ScrollIndicator />
      </div>

      <motion.div initial={false} animate={theme === "dark" ? "dark" : "light"}>
        <button
          aria-label="Toggle theme"
          type="button"
          className="dark-mode-toggle absolute top-5 right-5 p-2"
          onClick={toggleTheme}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            variants={vRotate}
            transition={trans}
            style={{ originX: "50%", originY: "50%" }}
          >
            <mask id="moon-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <motion.circle
                variants={vMCircle}
                transition={trans}
                cx="12"
                cy="4"
                r="9"
                fill="black"
              />
            </mask>
            <motion.circle
              variants={vCCircle}
              transition={trans}
              cx="12"
              cy="12"
              r="9"
              mask="url(#moon-mask)"
            />

            <motion.g
              variants={vLine}
              // transition={trans}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ originX: "50%", originY: "50%" }}
            >
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.g>
          </motion.svg>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
