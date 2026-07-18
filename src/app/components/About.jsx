"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SkillsMarquee from "./SkillsMarquee";
import SectionLabel from "./SectionLabel";

export default function About() {
  const sectionRef = useRef(null);
  const coreTech = [
    { name: "React.js", desc: "Frontend" },
    { name: "Next.js", desc: "Framework" },
    { name: "Node.js", desc: "Runtime" },
    { name: "NestJS", desc: "Backend" },
    {name: "MongoDB", desc: "Database"}
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-line",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
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
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src="/Developer_typing_JavaScript_Pyth…_202607091216.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.06]"
          style={{ willChange: "transform" }}
        ></video>
      </div>
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        
        <SectionLabel number="01" label="About" className="about-line mb-24" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="about-line text-white text-3xl md:text-5xl font-bold leading-tight font-[family-name:var(--font-display)] tracking-tight">
              Building what
              <br />
              <span className="text-[#22C55E]">matters.</span>
            </h2>
          </div>

          <div className="md:col-span-7 md:pt-2">
            <p className="about-line text-zinc-300 text-lg md:text-xl leading-relaxed mb-8">
              I am a Full Stack Engineer dedicated to architecting
              high-performance web applications. Moving beyond standard setups,
              I specialize in building type-safe backend microservices with
              NestJS and Node.js, paired with fluid, production-grade frontend
              experiences using React and Next.js.
            </p>
            <p className="about-line text-zinc-400 text-base md:text-lg leading-relaxed">
              I focus on writing clean, scalable code that translates complex
              business logic into seamless digital products.
            </p>
          </div>
        </div>
        <div className="about-line w-full h-px bg-white/[0.06] my-20"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {coreTech.map((tech, index) => (
            <div
              key={index}
              className="about-line group relative p-6 rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:border-[#22C55E]/30 hover:bg-[#22C55E]/[0.05] transition-all duration-500 hover:-translate-y-1 cursor-default"
            >
              <span className="text-zinc-600 font-mono text-xs mb-4 block">
                0{index + 1}
              </span>
              <span className="text-white text-lg font-semibold block mb-1 group-hover:text-[#22C55E] transition-colors duration-300">
                {tech.name}
              </span>
              <span className="text-zinc-500 font-mono text-xs tracking-wider uppercase">
                {tech.desc}
              </span>
              <div className="absolute top-6 right-6 h-1.5 w-1.5 rounded-full bg-zinc-700 group-hover:bg-[#22C55E] group-hover:shadow-[0_0_12px_rgba(34,197,94,0.6)] transition-all duration-300"></div>
            </div>
          ))}
        </div>
        <SkillsMarquee />
      </div>
    </section>
  );
}
