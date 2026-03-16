"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import { personalInfo, socialLinks } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Staggered character reveal for "YASH"
      const yashChars = nameRef.current?.querySelectorAll(".char-yash");
      const sharmaChars = nameRef.current?.querySelectorAll(".char-sharma");

      tl.from(yashChars!, {
        y: 120,
        opacity: 0,
        rotateX: -90,
        stagger: 0.08,
        duration: 1,
      })
        .from(
          sharmaChars!,
          {
            y: 120,
            opacity: 0,
            rotateX: -90,
            stagger: 0.08,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          taglineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          accentRef.current?.querySelectorAll(".accent-el")!,
          {
            scale: 0,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.5"
        )
        .from(
          socialRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderChars = (text: string, className: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className={`${className} inline-block`}
        style={{ perspective: "500px" }}
      >
        {char}
      </span>
    ));

  const getSocialIcon = (label: string) => {
    switch (label) {
      case "GitHub":
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "LinkedIn":
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case "Twitter":
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.317 4.3698a8.306 8.306 0 01-2.357.6461 4.118 4.118 0 001.804-2.27 8.221 8.221 0 01-2.606.9961 4.104 4.104 0 00-6.993 3.7427 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477 4.072 4.072 0 01-1.858-.5134v.0517a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.0702 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.843c7.547 0 11.675-6.253 11.675-11.675 0-.178-.004-.355-.012-.53a8.348 8.348 0 002.048-2.124 8.21 8.21 0 01-2.357.6461z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Red accent elements */}
      <div ref={accentRef} className="absolute inset-0 pointer-events-none">
        <div className="accent-el absolute top-20 left-10 w-2 h-2 rounded-full bg-[#DC2626]" />
        <div className="accent-el absolute top-40 left-6 w-1 h-20 bg-[#DC2626]/30" />
        <div className="accent-el absolute bottom-32 right-20 w-3 h-3 rounded-full bg-[#DC2626]/60" />
        <div className="accent-el absolute top-1/3 right-10 w-1 h-32 bg-[#DC2626]/20" />
        <div className="accent-el absolute bottom-20 left-1/4 w-16 h-[1px] bg-gradient-to-r from-[#DC2626] to-transparent" />
        <div className="accent-el absolute top-16 right-1/3 w-24 h-[1px] bg-gradient-to-l from-[#DC2626] to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side — text content */}
        <div className="flex flex-col gap-6">
          <div ref={nameRef}>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#E5E5E5] leading-none">
              {renderChars("YASH", "char-yash")}
            </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#DC2626] leading-none mt-2">
              {renderChars("SHARMA", "char-sharma")}
            </h1>
          </div>

          <p
            ref={taglineRef}
            className="text-lg md:text-xl text-[#E5E5E5]/70 font-light tracking-wide"
          >
            Software Engineer | ML Enthusiast | Tech Ninja
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-4">
            <MagneticButton href="#projects" variant="filled">
              View Projects
            </MagneticButton>
            <MagneticButton href="#contact" variant="outlined">
              Contact Me
            </MagneticButton>
          </div>
        </div>

        {/* Right side — placeholder for 3D scene overlay */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="w-full aspect-square max-w-lg rounded-full border border-[#DC2626]/10" />
        </div>
      </div>

      {/* Social links at bottom */}
      <div
        ref={socialRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6"
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E5E5E5]/50 hover:text-[#DC2626] transition-colors duration-300"
            aria-label={link.label}
          >
            {getSocialIcon(link.label)}
          </a>
        ))}
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-[#E5E5E5]/50 hover:text-[#DC2626] transition-colors duration-300"
          aria-label="Email"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2">
        <span className="text-[#E5E5E5]/30 text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#DC2626] to-transparent mt-12" />
      </div>
    </section>
  );
}
