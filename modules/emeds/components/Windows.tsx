import { useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { useScrollY } from '@/common/hooks/useScrollY';
import { useWindowSize } from '@/common/hooks/useWindowSize';

import SingleWindow from './SingleWindow';

const Windows = ({ windowLength = 1 }: { windowLength?: number }) => {
  const { height } = useWindowSize();
  const scrollY = useScrollY();

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  const startScroll = useRef(0);

  const progress =
    startScroll.current &&
    Math.round(
      Math.min(
        100,
        Math.max(
          0,
          ((scrollY - startScroll.current) / (windowLength * height - 100)) *
            100
        )
      ) * 100
    ) / 100;

  return (
    <motion.div
      className="sticky top-0 flex h-screen w-screen flex-col items-center justify-center gap-4 py-24 px-10"
      onViewportEnter={() => {
        if (startScroll.current === 0) {
          startScroll.current = scrollY + height;
        }
      }}
      onViewportLeave={() => {
        if (scrollY <= startScroll.current) {
          startScroll.current = 0;
        }
      }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-10 xl:flex-row">
        <SingleWindow
          mousePosition={mousePosition}
          setMousePosition={setMousePosition}
        />
      </div>
    </motion.div>
  );
};

export default Windows;
