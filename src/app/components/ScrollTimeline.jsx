"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import SectionLabel from "./SectionLabel";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 mr-2 text-[#22C55E]"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const DEFAULT_EVENTS = [
  {
    year: "Oct 2025 - Dec 2025",
    title: "Full Stack Developer (Virtual Internship)",
    subtitle: "Apexcify Technologies",
    description:
      "Completed a 2-month virtual internship focusing on building full-stack web applications. Developed web platforms, integrated database services, and created RESTful APIs.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    year: "Dec 2025 - Mar 2026",
    title: "MERN Stack Developer (Internship)",
    subtitle: "IIFA Tech",
    description:
      "Assisted in building and maintaining 2+ full-stack web applications using MongoDB, Express, React, and Node.js. Implemented JWT auth, role-based access control, and optimized database queries.",
    tags: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
  },
  {
    year: "Mar 2026 - Present",
    title: "Junior Full Stack Developer",
    subtitle: "Popcorn Studio (Johar Town, Lahore)",
    description:
      "Working as a Junior Full Stack Developer. Architecting high-performance web applications, designing scalable backend systems, and styling premium interfaces.",
    tags: ["Next.js", "React.js", "Node.js", "NestJS", "Tailwind CSS", "GSAP", "Lenis"],
  },
];

// Interactive Spotlight Card Component
const TimelineCard = ({
  event,
  index,
  activeIndex,
  getCardClasses,
  getCardVariants,
  cardAlignment,
  isEven,
  dateFormat,
}) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        getCardClasses(index),
        "relative overflow-hidden mt-10 lg:mt-0 p-6 md:p-8"
      )}
      variants={getCardVariants(index)}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        background: isHovered
          ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(34, 197, 94, 0.08), transparent 80%), rgba(255, 255, 255, 0.02)`
          : "rgba(255, 255, 255, 0.02)",
        transition: "background 0.3s ease, border-color 0.5s ease",
      }}
    >
      {/* Light border overlay mapping the spotlight */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl border border-[#22C55E]/30"
          style={{
            maskImage: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
          }}
        />
      )}

      {dateFormat === "badge" ? (
        <div
          className={cn(
            "flex items-center mb-4 text-xs font-mono tracking-wider",
            cardAlignment === "alternating" && isEven
              ? "lg:justify-end"
              : "justify-start"
          )}
        >
          {!isEven && cardAlignment === "alternating" ? (
            <>
              <CalendarIcon />
              <span className="text-[#22C55E] font-semibold">{event.year}</span>
            </>
          ) : (
            <>
              <span className="text-[#22C55E] font-semibold">{event.year}</span>
              <div className="ml-2">
                <CalendarIcon />
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="text-sm font-mono text-[#22C55E] mb-3">{event.year}</p>
      )}

      <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-tight">
        {event.title}
      </h3>

      {event.subtitle && (
        <p className="text-zinc-400 font-medium text-sm md:text-base mb-4 font-mono">
          {event.subtitle}
        </p>
      )}

      <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
        {event.description}
      </p>

      {event.tags && (
        <div
          className={cn(
            "flex flex-wrap gap-2 mt-6",
            cardAlignment === "alternating" && isEven
              ? "lg:justify-end"
              : "justify-start"
          )}
        >
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#22C55E]/[0.05] border border-[#22C55E]/15 text-[#22C55E]/90 hover:bg-[#22C55E]/10 hover:border-[#22C55E]/30 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function ScrollTimeline({
  events = DEFAULT_EVENTS,
  title = "My Journey",
  subtitle = "Scroll to explore the path of growth and experience",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-white/[0.06]",
  activeColor = "bg-[#22C55E]",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "glow",
  parallaxIntensity = 0.15,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
} = {}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(
    smoothProgress,
    [0.1, 0.85],
    ["0%", "100%"]
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * events.length * 1.25);
      const clampedIndex = Math.min(Math.max(newIndex - 1, -1), events.length - 1);
      setActiveIndex(clampedIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length]);

  const getCardVariants = (index) => {
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
        ? index * 0.15
        : index * 0.25;

    const initialStates = {
      fade: { opacity: 0, y: 30 },
      slide: {
        x:
          cardAlignment === "left"
            ? -100
            : cardAlignment === "right"
            ? 100
            : index % 2 === 0
            ? -80
            : 80,
        opacity: 0,
      },
      scale: { scale: 0.85, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation] || initialStates.fade,
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.8,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      },
      viewport: { once: true, margin: "-100px" },
    };
  };

  const getConnectorClasses = () => {
    const baseClasses = "absolute left-1/2 transform -translate-x-1/2";
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full", lineColor);
      case "dashed":
        return cn(
          baseClasses,
          "w-[2px] bg-transparent border-l border-dashed border-white/20"
        );
      case "line":
      default:
        return cn(baseClasses, "w-[2px]", lineColor);
    }
  };

  const getCardClasses = (index) => {
    const baseClasses =
      "relative z-30 rounded-2xl border border-white/[0.04] backdrop-blur-sm";

    const variantClasses = {
      default: "glass-panel bg-[#050505]/40",
      elevated: "glass-panel bg-white/[0.02]",
      outlined: "border-2 border-[#22C55E]/20 bg-black/60",
      filled: "bg-[#22C55E]/[0.03] border border-[#22C55E]/10",
    };

    const effectClasses = {
      none: "",
      glow: "hover:border-[#22C55E]/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.05)]",
      shadow:
        "hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] hover:-translate-y-1",
      bounce: "hover:scale-[1.02] active:scale-[0.98]",
    };

    const alignmentClassesDesktop =
      cardAlignment === "alternating"
        ? index % 2 === 0
          ? "lg:mr-[calc(50%+40px)] text-left lg:text-right"
          : "lg:ml-[calc(50%+40px)] text-left"
        : cardAlignment === "left"
        ? "lg:mr-auto lg:ml-0 text-left"
        : "lg:ml-auto lg:mr-0 text-left";

    return cn(
      baseClasses,
      variantClasses[cardVariant] || variantClasses.default,
      effectClasses[cardEffect] || effectClasses.none,
      alignmentClassesDesktop,
      "w-full lg:w-[calc(50%-40px)]"
    );
  };

  return (
    <section
      ref={scrollRef}
      className={cn(
        "relative w-full overflow-hidden py-32 md:py-44 bg-[#050505]",
        className
      )}
    >
      {/* Decorative Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 mb-24">
        <SectionLabel number="04" label="Experience" className="mb-8" />
        <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight font-[family-name:var(--font-display)] tracking-tight mb-4">
          Professional <span className="text-[#22C55E]">Journey.</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl">{subtitle}</p>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pb-24 z-10">
        <div className="relative mx-auto">
          {/* Main Connector Line */}
          <div
            className={cn(getConnectorClasses(), "h-full absolute top-0 z-10")}
          />

          {/* Enhanced Progress Indicator with Traveling Glow */}
          {progressIndicator && (
            <>
              {/* The main filled progress line */}
              <motion.div
                className="absolute top-0 z-10"
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: progressLineCap === "round" ? "9999px" : "0px",
                  background: `linear-gradient(to bottom, #22C55E, #15803D, #4ADE80)`,
                  boxShadow: `
                    0 0 15px rgba(34,197,94,0.4),
                    0 0 25px rgba(34,197,94,0.2)
                  `,
                }}
              />
              {/* The traveling glow "comet" at the head of the line */}
              <motion.div
                className="absolute z-20"
                style={{
                  top: progressHeight,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(34,197,94,1) 0%, rgba(34,197,94,0.6) 40%, rgba(34,197,94,0) 70%)",
                    boxShadow: `
                      0 0 12px 4px rgba(34,197,94,0.6),
                      0 0 20px 8px rgba(34,197,94,0.3)
                    `,
                  }}
                  animate={{
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          <div className="relative z-20">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.id || index}
                  className={cn(
                    "relative flex items-center mb-24 py-4 flex-col lg:flex-row",
                    cardAlignment === "alternating"
                      ? isEven
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                      : cardAlignment === "left"
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                  )}
                >
                  {/* Timeline point */}
                  <div
                    className={cn(
                      "absolute top-1/2 transform -translate-y-1/2 z-30",
                      "left-1/2 -translate-x-1/2"
                    )}
                  >
                    <motion.div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 bg-[#050505] flex items-center justify-center transition-all duration-300",
                        index <= activeIndex
                          ? "border-[#22C55E]"
                          : "border-white/10"
                      )}
                      animate={
                        index <= activeIndex
                          ? {
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                "0 0 0px rgba(34,197,94,0)",
                                "0 0 10px rgba(34,197,94,0.5)",
                                "0 0 0px rgba(34,197,94,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                    >
                      {index <= activeIndex && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      )}
                    </motion.div>
                  </div>

                  <TimelineCard
                    event={event}
                    index={index}
                    activeIndex={activeIndex}
                    getCardClasses={getCardClasses}
                    getCardVariants={getCardVariants}
                    cardAlignment={cardAlignment}
                    isEven={isEven}
                    dateFormat={dateFormat}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
