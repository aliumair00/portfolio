"use client";

import SectionLabel from "./SectionLabel";
import Button from "./Button";

export default function Contact() {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-screen bg-background flex flex-col items-center justify-center z-20 overflow-hidden py-20 md:py-32">
      
      <div className="absolute inset-0 z-0">
        <video
          src="/scene2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        ></video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/80"></div>
      </div>
      <SectionLabel
        number=" 04 "
        label="Contact"
        linePosition="none"
        textClass="text-zinc-300"
        gapClass="gap-3 md:gap-4"
        className="relative z-10 mb-8 md:mb-16 px-4 md:px-6 w-full max-w-7xl"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full flex flex-col items-center text-center mb-12 md:mb-24">
      
        <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-white mb-6 md:mb-6 font-[family-name:var(--font-display)] leading-none">
          Let&apos;s{" "}
          <span className="text-transparent text-stroke hover:text-[#22C55E] transition-colors duration-500 cursor-default">
            Talk.
          </span>
        </h2>

        <p className="text-zinc-400 mb-8 md:mb-14 max-w-xs sm:max-w-md md:max-w-lg font-mono text-xs sm:text-sm md:text-base leading-relaxed px-2">
          Have a project in mind? Let&apos;s collaborate and create something extraordinary together.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto px-4 sm:px-0">
          <Button
            href="mailto:aliumair55013@gmail.com"
            variant="primary"
          >
            Send Email
          </Button>
          <Button
            href="https://www.linkedin.com/in/ali-umair-6a93432b2/"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            LinkedIn
          </Button>
        </div>

        <div className="mt-10 md:mt-20 flex items-center gap-2 md:gap-3">
          <div className="h-px w-6 md:w-12 bg-[#22C55E]/30"></div>
          <span className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em]">
            aliumair55013@gmail.com
          </span>
          <div className="h-px w-6 md:w-12 bg-[#22C55E]/30"></div>
        </div>
      </div>
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center font-mono text-xs md:text-sm text-zinc-500 gap-2">
        <p>&copy; {new Date().getFullYear()} Ali Umair. All rights reserved.</p>
        <a href="https://github.com/aliumair00" target="_blank" rel="noreferrer" className="mt-2 md:mt-0 hover:text-[#22C55E] transition-colors">
          github.com/aliumair
        </a>
      </footer>
    </section>
  );
}
