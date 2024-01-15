import { motion } from "framer-motion";

import ScrollOpacity from "@/common/components/ScrollOpacity";
import { useMouseVariant } from "@/modules/customMouse";

import { Delayed } from "./Delayed";
import Type from "./Type";

const AboutHeader = () => {
  const { setMouseVariant } = useMouseVariant();

  return (
    <ScrollOpacity>
      <motion.h1
        className="header my-36 h-min px-5 text-center lg:my-96"
        onMouseEnter={setMouseVariant.text}
        onMouseLeave={setMouseVariant.default}
      >
        I&apos;m Vijai Suria, <br />a Software{" "}
        <span className="text-gradient">Developer</span> <br /> who{" "}
        <Delayed waitBeforeShow={2000}>
          <Type />
        </Delayed>
      </motion.h1>
    </ScrollOpacity>
  );
};

export default AboutHeader;
