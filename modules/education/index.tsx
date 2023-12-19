import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { educationData } from "./data";
import { useContext } from "react";

import { ThemeContext } from "@/modules/themeContext";
import { useMouseVariant } from "@/modules/customMouse";
import ScrollOpacity from "@/common/components/ScrollOpacity";

export default function Experience() {
  const { setMouseVariant } = useMouseVariant();
  const { theme } = useContext(ThemeContext);

  return (
    <section id="education" className="relative mt-36 flex w-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <ScrollOpacity>
          <div className="flex flex-col items-center justify-center">
            <h1
              onMouseEnter={setMouseVariant.text}
              onMouseLeave={setMouseVariant.default}
              className="header hover:hover-gradient -mt-10 mb-8 w-full px-10 text-center sm:mt-0"
            >
              Educational <span className="text-gradient">Epoch</span>
            </h1>
            <p className="mb-10 px-10 text-center text-2xl">
              Journey through Learning: My Educational Timeline
            </p>
            <VerticalTimeline lineColor="#414652">
              {educationData.map((item, index) => (
                <React.Fragment key={index}>
                  <VerticalTimelineElement
                    contentStyle={{
                      background:
                        theme === "light"
                          ? "#f5f6f7"
                          : "rgba(255, 255, 255, 0.05)",
                      boxShadow: "none",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      textAlign: "left",
                      padding: "1.3rem 2rem",
                    }}
                    contentArrowStyle={{
                      borderRight:
                        theme === "light"
                          ? "0.4rem solid #9ca3af"
                          : "0.4rem solid rgba(255, 255, 255, 0.5)",
                    }}
                    date={item.date}
                    icon={item.icon}
                    iconStyle={{
                      background:
                        theme === "light"
                          ? "white"
                          : "rgba(255, 255, 255, 0.15)",
                      fontSize: "1.5rem",
                    }}
                  >
                    <h3 className="font-semibold capitalize">{item.title}</h3>
                    <p className="!mt-0 font-normal">{item.institute}</p>
                    {item.location && (
                      <p className="!mt-0 font-normal">{item.location}</p>
                    )}
                    <p>{item.grade}</p>
                    <p
                      className={`!mt-1 !font-normal ${
                        theme === "light" ? "text-gray-700" : "text-white/75"
                      }`}
                    >
                      {item.achievement}
                    </p>
                  </VerticalTimelineElement>
                </React.Fragment>
              ))}
            </VerticalTimeline>
          </div>
        </ScrollOpacity>
      </div>
    </section>
  );
}
