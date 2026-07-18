"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

import { wrap } from "@/utils/math";

export default function SkillsMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef(-1);

  useAnimationFrame((t, delta) => {
    if (isHovered) return;

    const baseSpeed = 5; 
    let moveBy = directionFactor.current * baseSpeed * (delta / 1000);

    const velocity = velocityFactor.get();
    const scrollSpeed = Math.abs(velocity);

    if (scrollSpeed > 0.05) {
      directionFactor.current = velocity < 0 ? 1 : -1;
      moveBy += directionFactor.current * scrollSpeed * 2 * (delta / 1000);
    } else {
      directionFactor.current = -1;
    }

    baseX.set(baseX.get() + moveBy);
  });

  // We duplicate the text 4 times, each copy takes 25% of the width.
  // We wrap between -25% and 0.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="relative w-full overflow-hidden flex whitespace-nowrap mt-32 border-y border-white/[0.04] py-8 z-10 pointer-events-none">
      <motion.div
        className="flex gap-16 min-w-full pointer-events-auto cursor-pointer"
        style={{ x }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex gap-16 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] text-5xl md:text-7xl font-black font-[family-name:var(--font-display)] uppercase"
          >
            <span className="hover:text-[#22C55E] hover:[-webkit-text-stroke:0px] transition-colors duration-300">
              React.js
            </span>
            <span className="hover:text-[#22C55E] hover:[-webkit-text-stroke:0px] transition-colors duration-300">
              Next.js
            </span>
            <span className="hover:text-[#22C55E] hover:[-webkit-text-stroke:0px] transition-colors duration-300">
              NestJS
            </span>
            <span className="hover:text-[#22C55E] hover:[-webkit-text-stroke:0px] transition-colors duration-300">
              Node.js
            </span>
            <span className="hover:text-[#22C55E] hover:[-webkit-text-stroke:0px] transition-colors duration-300">
              MongoDB
            </span>
            <span className="hover:text-[#22C55E] hover:[-webkit-text-stroke:0px] transition-colors duration-300">
              TypeScript
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
