import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { BsCursorFill } from 'react-icons/bs';

import { useElementDimensions } from '@/common/hooks/useElementDimensions';
import { useMouseVariant } from '@/modules/customMouse';

interface Props {
  mousePosition: { x: number; y: number };
  setMousePosition: (mousePosition: { x: number; y: number }) => void;
}

const SingleWindow = ({
  mousePosition,
  setMousePosition,
}: Props) => {
  const { setMouseVariant } = useMouseVariant();

  const windowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { width, height } = useElementDimensions(windowRef);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const dpi = window.devicePixelRatio;

      canvas.width = width * dpi;
      canvas.height = height * dpi;

      const ctx = canvas.getContext('2d');
    }
  }, [width, height]);

  return (
    <div className="pointer-events-auto relative flex h-[25vh] w-full flex-col items-center justify-center sm:h-[30vh] sm:w-2/3 xl:h-[25vw] xl:w-1/2  2xl:w-2/5">
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-white">
        <div className="relative flex h-10 w-full flex-row items-center justify-center bg-zinc-800">
          <div className="absolute left-5 flex h-full items-center gap-1 justify-self-start">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <a
            className="pointer-events-auto ml-10 flex h-6 w-1/2 items-center justify-center overflow-hidden truncate rounded-lg bg-zinc-700 text-sm text-zinc-300 hover:underline md:ml-0"
            href="https://emedicals.000webhostapp.com/"
            target="_blank"
            rel="noreferrer"
          >
            emedicals.000webhostapp.com
          </a>
        </div>

        <div
          className="relative flex flex-1 touch-none items-center"
          ref={windowRef}
          onMouseEnter={setMouseVariant.drawing}
          onMouseLeave={setMouseVariant.default}
          onMouseMove={(e) => {
            const rect = windowRef.current?.getBoundingClientRect();
            if (rect) {
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              setMousePosition({ x, y });
            }
          }}
        >
          <iframe
            className="absolute top-0 left-0"
            style={{ width, height }}
            src="https://emedicals.000webhostapp.com/"
            title="Webpage"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleWindow;
