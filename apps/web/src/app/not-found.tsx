"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { IconMovie, IconHome, IconChevronLeft } from "@tabler/icons-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main container entry
      gsap.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      // Glitchy 404 animation
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      tl.to(titleRef.current, { skewX: 20, duration: 0.1, ease: "power4.inOut" })
        .to(titleRef.current, { skewX: 0, duration: 0.1 })
        .to(titleRef.current, { x: -10, duration: 0.05, borderLeft: "2px solid #FAAA47" })
        .to(titleRef.current, { x: 0, duration: 0.05, borderLeft: "none" })
        .to(titleRef.current, { opacity: 0.5, duration: 0.1 })
        .to(titleRef.current, { opacity: 1, duration: 0.1 });

      // Floating text and buttons
      gsap.from([textRef.current, ".nav-btn"], {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });

      // Rotating film strip background
      gsap.to(filmStripRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Mouse parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;
        
        gsap.to(".parallax-bg", {
          x: xPos,
          y: yPos,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden text-white"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div 
          ref={filmStripRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[40px] border-dashed border-[#FAAA47]/30 rounded-full parallax-bg"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/60 to-black" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <h1 
          ref={titleRef}
          className="text-[120px] md:text-[200px] font-black leading-none mb-4 select-none tracking-tighter"
          style={{ 
            textShadow: "0 0 30px rgba(250, 170, 71, 0.4)",
            color: "transparent",
            WebkitTextStroke: "2px #FAAA47"
          }}
        >
          404
        </h1>
        
        <div ref={textRef}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#FAAA47] mb-6 uppercase tracking-widest italic">
            The Curtain Has Fallen
          </h2>
          <p className="text-xl text-[#CAC1C1] mb-12 max-w-xl mx-auto font-medium">
            It look like we&apos;ve reached the end of the reel. The page you&apos;re searching for is currently out of focus or has been cut from the final edit.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/"
            className="nav-btn group flex items-center gap-3 px-8 py-4 bg-[#FAAA47] text-black font-black uppercase rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(250,170,71,0.3)]"
          >
            <IconHome size={24} />
            Return Home
          </Link>

          <Link 
            href="/movies"
            className="nav-btn group flex items-center gap-3 px-8 py-4 border-2 border-[#FAAA47] text-[#FAAA47] font-black uppercase rounded-2xl hover:bg-[#FAAA47] hover:text-black hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            <IconMovie size={24} />
            Discover Movies
          </Link>
        </div>

        {/* Back Link */}
        <button 
          onClick={() => window.history.back()}
          className="nav-btn mt-12 flex items-center gap-2 text-[#8F8F8F] hover:text-white transition-colors font-bold mx-auto group"
        >
          <IconChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          Go Back to Previous Show
        </button>
      </div>

      {/* Bottom Film Strip Decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-20 h-16 flex border-y-4 border-dashed border-[#FAAA47]">
         {Array.from({ length: 20 }).map((_, i) => (
           <div key={i} className="flex-shrink-0 w-24 h-full border-r-4 border-dashed border-[#FAAA47] flex items-center justify-center">
             <IconMovie className="text-[#FAAA47]/30" />
           </div>
         ))}
      </div>
    </div>
  );
}
