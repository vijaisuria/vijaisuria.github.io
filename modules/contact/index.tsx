import { motion } from "framer-motion";
import { BsChevronUp } from "react-icons/bs";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

import ScrollOpacity from "@/common/components/ScrollOpacity";

import { useMouseVariant } from "../customMouse";

const Contact = () => {
  const { setMouseVariant } = useMouseVariant();

  return (
    <section className="relative h-screen w-screen" id="contact">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <ScrollOpacity>
          <div className="flex flex-col items-center justify-center">
            <h1
              className="header -mt-10 w-full px-10 text-center sm:mt-0"
              onMouseEnter={setMouseVariant.text}
              onMouseLeave={setMouseVariant.default}
              id="contact"
            >
              Let&apos;s work together.
            </h1>

            <p className="mt-3 text-lg text-zinc-400 lg:mt-4 lg:text-xl">
              vijaisuria87@gmail.com
            </p>
            <a
              className="primary-gradient scale-btn hover:hover-gradient mt-4 rounded-2xl p-2 px-4 text-lg transition-all duration-300 lg:mt-6 lg:p-3 lg:px-6 lg:text-xl"
              href="mailto:vijaisuria87@gmail.com"
            >
              Contact me
            </a>
          </div>
        </ScrollOpacity>

        <motion.button
          className="absolute bottom-20 flex flex-col items-center rounded-lg bg-transparent p-2 font-sans text-lg transition-colors hover:bg-zinc-800"
          onClick={() =>
            document
              .getElementById("hero")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <BsChevronUp />
          Back to top
        </motion.button>

        <div className="absolute bottom-0 h-20 w-full">
          <div className="flex h-full w-full items-center justify-center gap-5 text-lg text-zinc-400 lg:text-xl">
            <p>© 2023 Vijai Suria</p>
            <a
              href="https://www.linkedin.com/in/vijaisuria/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="scale-btn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/vijaisuria"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="scale-btn"
            >
              <FaGithub />
            </a>

            <a
              href="https://twitter.com/vijaisuria"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="scale-btn"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
