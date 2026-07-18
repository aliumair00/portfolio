"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import Button from "./Button";
import Image from "next/image";

const projects = [
  {
    name: "Gym Management",
    desc: "A comprehensive gym management dashboard with payment analytics, class scheduling, and real-time tracking for educational institutions.",
    tags: ["MERN", "Dashboard"],
    image: "/projects/gym.png",
    link: "https://apexcify-technologys-gym-center-man.vercel.ap",
    github: "https://github.com/aliumair00/Gym-Center-Management-System",
  },
  {
    name: "NeedStack Ai",
    desc: "Neddstack is a software where user can find AI based solution provider for their projects and AI based solution provider can find projects for their skills.",
    tags: ["Next.js", "TypeScript"],
    image: "/projects/needstack.png",
    link: "https://need-stack-ai.vercel.app/",
    github: "https://github.com/aliumair00/NeedStack-ai",
  },
  {
    name: "Portfolio",
    desc: "My Portfolio website showcasing my projects and skills.",
    tags: ["React"],
    image: "/projects/portfolio.png",
    link: "https://ali-umair-portfolio.vercel.app/",
    github: "https://github.com/aliumair00/ali-umair-portfolio",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
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

  const current = projects[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background overflow-hidden py-32 md:py-44"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="projects-reveal flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <SectionLabel label="My Work" linePosition="start" className="mb-6" />
            <h2 className="text-white text-5xl md:text-7xl font-black leading-[0.95] font-[family-name:var(--font-display)] uppercase tracking-tight">
              Latest
              <br />
              Projects
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <Button onClick={goPrev} variant="icon">
              <svg
                className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button onClick={goNext} variant="icon">
              <svg
                className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
            <span className="ml-4 text-zinc-600 font-mono text-sm">
              <span className="text-white font-bold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Featured Project Card */}
        <div className="projects-reveal">
          <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-[#22C55E]/20 transition-all duration-500">
            
            {/* Image Area - Natural size, no crop */}
            <div className="relative w-full overflow-hidden bg-[#0a0a0a]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image
                    src={current.image}
                    alt={current.name}
                    width={1600}
                    height={900}
                    className="w-full h-auto block"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Details Area */}
            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
                {/* Left: Title + Tags */}
                <div className="flex-1 min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={`title-${currentIndex}`}
                      className="text-white text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight uppercase mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      {current.name}
                    </motion.h3>
                  </AnimatePresence>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                    {current.tags.filter(Boolean).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono font-bold tracking-wider uppercase bg-white/5 text-zinc-400 px-3 py-1.5 rounded-md border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Description + Buttons */}
                <div className="md:max-w-sm lg:max-w-md flex-shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`desc-${currentIndex}`}
                      className="text-zinc-500 text-sm md:text-base leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {current.desc}
                    </motion.p>
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    {current.link && (
                      <Button
                        href={current.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                      >
                        View Live
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H7M17 7v10"
                          />
                        </svg>
                      </Button>
                    )}
                    {current.github && (
                      <Button
                        href={current.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                      >
                        GitHub Link
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Dots */}
        <div className="projects-reveal flex justify-center gap-2 mt-10">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "w-8 bg-[#22C55E]"
                  : "w-4 bg-white/10 hover:bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
