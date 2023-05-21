import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { useElementDimensions } from '@/common/hooks/useElementDimensions';
// import { isMobile } from '@/common/lib/isMobile';
import { useMouseVariant } from '@/modules/customMouse';

const Game = () => {
  const { setMouseVariant } = useMouseVariant();

  const [run, setRun] = useState(false);

  const playerPosition = useRef({ x: 0, y: 0 });
  const ball = useRef<Ball>({
    position: { x: 0, y: 0 },
    velocityVector: { x: 0, y: 0 },
  });

  const windowRef = useRef<HTMLDivElement>(null);
  const movablesRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { width, height } = useElementDimensions(windowRef);

  const handleUserMove = ({ x, y }: { x: number; y: number }) => {
    const node = windowRef.current;

    if (node) {
      const rect = node.getBoundingClientRect();

      playerPosition.current = {
        x: x - rect.left,
        y: y - rect.top,
      };
    }
  };

  // MOVABLES SETUP
  useEffect(() => {
    const canvas = movablesRef.current;

    if (canvas) {
      const dpi = window.devicePixelRatio;

      canvas.width = width * dpi;
      canvas.height = height * dpi;

      playerPosition.current = {
        x: width - 100,
        y: height / 2,
      };

      const ctx = canvas.getContext('2d');

      if (ctx) ctx.scale(dpi, dpi);
    }
  }, [width, height]);

  useEffect(() => {
    const dpi = window.devicePixelRatio;
    const canvas = movablesRef.current;

    if (!canvas || !run) return () => {};

    const interval = setInterval(() => {

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // PLAYER
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(
          playerPosition.current.x,
          playerPosition.current.y,
          15,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    }, 1000 / 64);

    return () => clearInterval(interval);
  }, [run]);

  useEffect(() => {
    const canvas = movablesRef.current;

    if (canvas) {
      const dpi = window.devicePixelRatio;

      canvas.width = width * dpi;
      canvas.height = height * dpi;

      playerPosition.current = {
        x: width - 100,
        y: height / 2,
      };

      const ctx = canvas.getContext('2d');

      if (ctx) ctx.scale(dpi, dpi);

      // Add event listener for mouse movement
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Clean up the event listener
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [width, height]);

  // Handle mouse movement event
  const handleMouseMove = (event) => {
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    // Pass pointer coordinates to the iframe
    const iframe = document.getElementById('gameIframe');
    iframe.contentWindow.postMessage({ x: pointerX, y: pointerY }, '*');
  };


  return (
    <div className="sticky top-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-4 px-6">
      <p className="text-zinc-400">
        {/* {isMobile()
          ? '(try to move pointer with your finger)'
          : '(try to move pointer with your mouse)'} */}
      </p>
      <motion.div
        className="relative flex h-[75vw] w-full flex-col items-center justify-center sm:h-[55vw] sm:w-3/4 md:h-[50vw] xl:h-[40vw] xl:w-2/3"
        onViewportEnter={() => setRun(true)}
        onViewportLeave={() => setRun(false)}
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg ">
          <div className="relative flex h-10 w-full flex-row items-center justify-center bg-zinc-800">
            <div className="absolute left-5 flex h-full items-center gap-1 justify-self-start">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <a
              className="ml-10 flex h-6 w-1/2 items-center justify-center overflow-hidden truncate rounded-lg bg-zinc-700 text-sm text-zinc-300 hover:underline md:ml-0"
              href="https://vijaisuria.github.io/Tower-of-Hanoi/"
              target="_blank"
              rel="noreferrer"
            >
              vijaisuria.github.io/Tower-of-Hanoi
            </a>
          </div>

          <div
            className="relative flex flex-1 touch-none items-center overflow-hidden rounded-lg bg-[#5A9D61]"
            ref={windowRef}
            onMouseMove={(e) => handleUserMove({ x: e.clientX, y: e.clientY })}
            onTouchMove={(e) =>
              handleUserMove({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
              })
            }
          >
            <iframe
              id="gameIframe"
              className="absolute top-0 left-0"
              style={{ width, height }}
              src="https://vijaisuria.github.io/Tower-of-Hanoi/"
              title="Webpage"
              onMouseEnter={setMouseVariant.game}
              onMouseLeave={setMouseVariant.default}
            />
            {/*<canvas
              id="movablesCanvas"
              ref={movablesRef}
              className="absolute top-0 left-0 z-10"
              style={{ width, height }}
              onMouseEnter={setMouseVariant.game}
              onMouseLeave={setMouseVariant.default}
            />*/}
            
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Game;
