import React from "react";
import style from "styled-jsx/style";
import Typewriter from "typewriter-effect";
import HTMLString from "typewriter-effect";

function Type() {
  const htmlStrings = [
    "creates <br> interactive  <span class='text-gradient'>web</span> application.",
    "trains <br> cutting-edge <span class='text-gradient'>ML</span> models.",
    "builds <br> robust <span class='text-gradient'>API</span> services.",
    "contibutes <br> to <span class='text-gradient'>Open Source</span> Projects.",
  ];

  return (
    <Typewriter
      options={{
        strings: htmlStrings,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
