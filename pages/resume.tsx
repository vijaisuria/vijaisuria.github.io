import { useEffect } from "react";
import Head from "next/head";
import CustomMouse from "@/modules/customMouse";

export default function ResumePage() {
  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0, 0);
    };

    window.onunload = scrollTop;
  }, []);
  return (
    <>
      <h1>Hi</h1>
    </>
  );
}
