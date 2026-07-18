"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SectionLabel from "./SectionLabel";

const services = [
  {
    num: "01",
    shortTitle: "FRONTEND",
    fullTitle: "FRONTEND DEV",
    desc: "Pixel-perfect, responsive interfaces built with React & Next.js. Focused on performance & fluid UI.",
    tags: ["React", "Next.js", "Tailwind"],
    accent: "#22C55E", // Emerald
    tabBg: "#22C55E",
    tabText: "#050505",
    bodyBg: "#0a0a0a",
  },
  {
    num: "02",
    shortTitle: "BACKEND",
    fullTitle: "BACKEND ARCH",
    desc: "Scalable, type-safe microservices and REST/GraphQL APIs engineered for production reliability.",
    tags: ["NestJS", "Node.js", "Express"],
    accent: "#f5f5f7", // White
    tabBg: "#f5f5f7",
    tabText: "#050505",
    bodyBg: "#0a0a0a",
  },
  {
    num: "03",
    shortTitle: "DATABASE",
    fullTitle: "DATABASE & OPS",
    desc: "Schema design, query optimization, and deployment pipelines. CI/CD automation & Docker.",
    tags: ["MongoDB", "Docker", "CI/CD"],
    accent: "#71717a", // Zinc-500
    tabBg: "#27272a", // Zinc-800
    tabText: "#f5f5f7",
    bodyBg: "#0a0a0a",
  },
  {
    num: "04",
    shortTitle: "FULL STACK",
    fullTitle: "FULL STACK",
    desc: "End-to-end product development — from initial architecture to deployed, scalable applications.",
    tags: ["MERN", "Next.js", "TypeScript"],
    accent: "#22C55E", // Emerald
    tabBg: "#22C55E",
    tabText: "#050505",
    bodyBg: "#0a0a0a",
  },
];

const TiltCard = ({ service }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] md:h-[500px] rounded-2xl flex flex-col group cursor-default mt-6"
    >
      {/* Tab Section (Top) */}
      <div 
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-14 z-20"
        style={{ transform: "translateZ(40px) translateX(-50%)" }}
      >
        {/* Tab Body */}
        <div 
          className="absolute inset-0 rounded-t-xl rounded-b-sm border-x border-t border-black/20 flex flex-col items-center justify-start pt-1.5 shadow-2xl"
          style={{ backgroundColor: service.tabBg, color: service.tabText }}
        >
          <span className="uppercase tracking-widest text-[9px] font-black opacity-80 leading-none mb-0.5">SRVC</span>
          <span className="font-bold text-sm leading-none">{service.num}</span>
        </div>
        
        {/* Decorative Hole with Rope inside */}
        <div className="absolute top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[20px] h-[20px] bg-background rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden">
          {/* Rope segment that perfectly matches the main rope behind it */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-gradient-to-b from-zinc-800 to-zinc-950 border-y border-zinc-700/50 shadow-[0_5px_15px_rgba(0,0,0,0.5)]"></div>
        </div>
      </div>

      {/* Main Body */}
      <div 
        className="absolute inset-0 rounded-2xl border border-white/10 overflow-hidden flex flex-col"
        style={{ backgroundColor: service.bodyBg }}
      >
        {/* Background Decorative Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-background border-y border-white/5 z-0"></div>

        {/* Top Half: Massive Title */}
        <div 
          className="flex-1 flex items-center justify-center relative z-10"
          style={{ transform: "translateZ(50px)" }}
        >
          <h2 
            className="text-4xl lg:text-5xl xl:text-6xl text-center px-4 font-black font-[family-name:var(--font-display)] uppercase tracking-tighter"
            style={{ color: service.accent }}
          >
            {service.shortTitle}
          </h2>
        </div>

        {/* Bottom Half: Details */}
        <div 
          className="h-[45%] bg-background/90 border-t border-white/10 p-6 flex flex-col justify-between relative z-10"
          style={{ transform: "translateZ(30px)", willChange: "transform" }}
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
                Expertise
              </span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.accent }}></div>
            </div>
            <h3 className="text-white text-xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-3 uppercase">
              {service.fullTitle}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>

          {/* Timeline / Tags Area */}
          <div className="mt-4 relative pt-4 border-t border-white/10 border-dashed">
            <div className="absolute top-0 left-0 right-0 -mt-[1px] flex justify-between">
              {service.tags.map((_, i) => (
                <div key={i} className="w-1 h-1 bg-zinc-600 rounded-full"></div>
              ))}
            </div>
            <div className="flex justify-between">
              {service.tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-label",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".brutalist-card-wrapper",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background overflow-hidden py-32 md:py-44"
      style={{ perspective: "1000px" }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)" }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <SectionLabel number="02" label="Services" className="services-label mb-6" />

        <div className="services-label mb-24 max-w-2xl">
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight font-[family-name:var(--font-display)] tracking-tight mb-6 uppercase">
            What I <span className="text-[#22C55E]">Engineer.</span>
          </h2>
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed">
            Specialized in building modern, scalable web solutions. Hover over the cards to interact.
          </p>
        </div>

        {/* Horizontal Drag Slider */}
        <motion.div ref={carouselRef} className="mt-16 overflow-hidden cursor-grab active:cursor-grabbing pb-12 relative">
          <motion.div
            drag="x"
            dragConstraints={carouselRef}
            className="flex gap-12 md:gap-16 w-max relative px-12 pt-8"
          >
            {/* The Continuous Rope */}
            <div className="absolute top-[36px] left-0 right-0 h-3 bg-gradient-to-b from-zinc-800 to-zinc-950 border-y border-zinc-700/50 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-0 pointer-events-none"></div>

            {services.map((service, index) => (
              <div
                key={index}
                className="brutalist-card-wrapper w-[300px] md:w-[400px] flex-shrink-0 relative z-10"
              >
                <TiltCard service={service} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
