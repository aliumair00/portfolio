"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const frameCount = 158;
    const currentFrame = (index) =>
      `/scene1/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    let loadedCount = 0;
    const images = [];

    
    let cssWidth = 0;
    let cssHeight = 0;

    const setCanvasSize = () => {
      if (!heroRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      cssWidth = heroRef.current.clientWidth;
      cssHeight = heroRef.current.clientHeight;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    };

    setCanvasSize();

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1 && i === 0) {
          renderFrame(0);
        }
      };
      images.push(img);
    }

    const renderFrame = (index) => {
      if (images[index] && images[index].complete && context) {
        const img = images[index];
        const hRatio = cssWidth / img.width;
        const vRatio = cssHeight / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (cssWidth - img.width * ratio) * 0.5;
        const centerShift_y = (cssHeight - img.height * ratio) * 0;

        context.clearRect(0, 0, cssWidth, cssHeight);
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    };

    const handleResize = () => {
      setCanvasSize();
      renderFrame(Math.round(canvasObj.frame));
    };
    window.addEventListener("resize", handleResize);

    const canvasObj = { frame: 0 };
    const canvasST = ScrollTrigger.create({
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

    const parallaxST = ScrollTrigger.create({
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
      window.removeEventListener("resize", handleResize);
      canvasST.kill();
      parallaxST.kill();
      if (statsAnim.scrollTrigger) statsAnim.scrollTrigger.kill();
      statsCountAnims.forEach(anim => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
      });
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative h-screen w-full max-w-[1920px] mx-auto">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ willChange: "contents" }}
        ></canvas>

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

          <p className="hero-desc mt-4 text-sm md:text-lg text-zinc-300 max-w-2xl text-center font-mono opacity-0 leading-relaxed mb-12">
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