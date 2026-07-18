"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Button from "./Button";

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;

    // Detect mobile for performance optimizations
    const isMobile = window.innerWidth < 768;

    let canvasST;
    let parallaxST;
    let handleResize;

    if (!isMobile && canvas) {
      const context = canvas.getContext("2d");
      const frameCount = 158;

      const currentFrame = (originalIndex) => {
        return `/scene1/ezgif-frame-${(originalIndex + 1).toString().padStart(3, "0")}.jpg`;
      };

      let loadedCount = 0;
      const images = [];

      let cssWidth = 0;
      let cssHeight = 0;

      const setCanvasSize = () => {
        if (!canvas) return;
        const rawDpr = window.devicePixelRatio || 1;
        cssWidth = window.innerWidth;
        cssHeight = window.innerHeight;
        canvas.width = cssWidth * rawDpr;
        canvas.height = cssHeight * rawDpr;
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;
        context.setTransform(rawDpr, 0, 0, rawDpr, 0, 0);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
      };

      setCanvasSize();

      // Load and pre-decode images using createImageBitmap for off-thread decoding
      for (let i = 0; i < frameCount; i++) {
        const img = new window.Image();
        img.src = currentFrame(i);
        img.onload = () => {
          window.createImageBitmap(img)
            .then((bitmap) => {
              images[i] = bitmap;
              loadedCount++;
              if (i === 0 || loadedCount === 1) {
                renderFrame(0);
              }
            })
            .catch(() => {
              images[i] = img;
              loadedCount++;
              if (i === 0 || loadedCount === 1) {
                renderFrame(0);
              }
            });
        };
        img.onerror = () => {
          loadedCount++;
        };
      }

      const renderFrame = (index) => {
        const img = images[index];
        if (img && context) {
          const imgWidth = img.width || 640;
          const imgHeight = img.height || 360;
          const hRatio = cssWidth / imgWidth;
          const vRatio = cssHeight / imgHeight;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (cssWidth - imgWidth * ratio) * 0.5;
          const centerShift_y = (cssHeight - imgHeight * ratio) * 0;

          context.clearRect(0, 0, cssWidth, cssHeight);
          context.drawImage(
            img,
            0,
            0,
            imgWidth,
            imgHeight,
            centerShift_x,
            centerShift_y,
            imgWidth * ratio,
            imgHeight * ratio
          );
        }
      };

      const canvasObj = { frame: 0 };
      canvasST = ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 2.5,
        animation: gsap.to(canvasObj, {
          frame: frameCount - 1,
          ease: "none",
          onUpdate: () => renderFrame(Math.round(canvasObj.frame)),
        }),
      });

      parallaxST = ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=3000",
        scrub: true,
        animation: gsap.to(scrollContainerRef.current, {
          y: -300,
          opacity: 0,
          ease: "none"
        })
      });

      handleResize = () => {
        setCanvasSize();
        renderFrame(Math.round(canvasObj.frame));
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);
    }

    const chars = textRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 100, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      }
    );

    const subtitle = heroRef.current.querySelector(".hero-subtitle");
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 0, filter: "blur(10px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1.5, delay: 0.8, ease: "power2.out" }
      );
    }

    const desc = heroRef.current.querySelector(".hero-desc");
    if (desc) {
      gsap.fromTo(
        desc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, delay: 1, ease: "power2.out" }
      );
    }

    const verticalSocials = heroRef.current.querySelector(".hero-vertical-socials");
    if (verticalSocials) {
      gsap.fromTo(
        verticalSocials,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.5, delay: 1.2, ease: "power2.out" }
      );
    }

    const scrollIndicator = heroRef.current.querySelector(".hero-scroll-indicator");
    if (scrollIndicator) {
      gsap.fromTo(
        scrollIndicator,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 1.5, ease: "power2.out" }
      );
    }

    const statsElements = statsRef.current.querySelectorAll(".stat-num");
    const statsAnim = gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        }
      }
    );

    const statsCountAnims = [];
    statsElements.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      const anim = gsap.to(el, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        }
      });
      statsCountAnims.push(anim);
    });

    return () => {
      if (handleResize) window.removeEventListener("resize", handleResize);
      if (canvasST) canvasST.kill();
      if (parallaxST) parallaxST.kill();
      if (statsAnim.scrollTrigger) statsAnim.scrollTrigger.kill();
      statsCountAnims.forEach(anim => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
      });
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative h-screen w-full max-w-[1920px] mx-auto">
        {/* Mobile Static Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 md:hidden"
          style={{ backgroundImage: "url('/hero-mobile.jpeg')" }}
        ></div>

        {/* Desktop Interactive Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
          style={{ willChange: "transform" }}
        ></canvas>

        <div className=" absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10"></div>

        {/* Left Side Vertical Socials */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6 items-center pointer-events-auto hero-vertical-socials opacity-0">
          <a
            href="https://github.com/aliumair00"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#22C55E] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:scale-110 transition-all duration-300 ease-out"
            title="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/ali-umair-6a93432b2/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#22C55E] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:scale-110 transition-all duration-300 ease-out"
            title="LinkedIn"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <a
            href="/Ali Umair Mern Stack.pdf"
            download="Ali_Umair_Mern_Stack.pdf"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#22C55E] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:scale-110 transition-all duration-300 ease-out"
            title="Download CV"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>

          <div className="hidden md:block h-24 w-[1px] bg-gradient-to-b from-gray-600 via-gray-700 to-transparent" />
        </div>

        <div className=" absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10"></div>
        <div ref={scrollContainerRef} className="mb-8 md:mb-[-2%] md:ml-[3%] absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pointer-events-none">
          <h1
            ref={textRef}
            className="text-[17vw] md:text-[7rem] font-black uppercase tracking-tighter font-[family-name:var(--font-display)] leading-none text-center drop-shadow-2xl pointer-events-auto  "
          >
            {Array.from("Ali Umair").map((char, i) => {
            
              const isUmair = i >= 4;

              return (
                <span
                  key={i}
                  className={`char inline-block ${
                    isUmair
                      ? "text-transparent [-webkit-text-stroke:2px_rgba(245,245,247,0.7)] md:[-webkit-text-stroke:3px_rgba(245,245,247,0.8)]"
                      : "text-[#f5f5f7]"
                  }`}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </h1>

          <p className="hero-desc mt-4 text-sm md:text-lg text-zinc-300 max-w-2xl text-center font-mono opacity-0 leading-relaxed mb-8">
            I am a <span className="text-[#22C55E]">full stack developer</span> specializing in dynamic web applications. With expertise in <span className="text-[#22C55E]">MongoDB, Express.js, React, Node.js, Next.js,</span> and <span className="text-[#22C55E]">NestJS</span>.
          </p>

        </div>
      </section>

      <section className="relative z-30 mt-8 mb-32 max-w-5xl mx-auto px-6">
        <div ref={statsRef} className="glass-panel rounded-2xl p-8 flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0 emerald-glow transition-all duration-500 opacity-0">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-[family-name:var(--font-display)]"><span className="stat-num" data-target="2">0</span>+</h3>
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Years of Experience</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/10"></div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-[family-name:var(--font-display)]"><span className="stat-num" data-target="5">0</span>+</h3>
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Projects Completed</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/10"></div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-[family-name:var(--font-display)]"><span className="stat-num" data-target="10">0</span>+</h3>
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Happy Clients</p>
          </div>
          
        </div>
      </section>
    </>
  );
}