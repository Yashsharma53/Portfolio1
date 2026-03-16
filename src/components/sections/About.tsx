"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/ui/SectionTitle";
import { personalInfo } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "8.34", label: "GPA" },
  { value: "3+", label: "Projects" },
  { value: "2", label: "Internships" },
  { value: "5+", label: "Certificates" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // About text fade in
      gsap.from(textRef.current!, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Stats cards stagger
      gsap.from(statsRef.current!.querySelectorAll(".stat-card"), {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Quote fade in
      gsap.from(quoteRef.current!, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32"
      style={{ background: "rgba(10, 10, 10, 0.75)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Left — About text */}
          <div ref={textRef}>
            <p className="text-[#E5E5E5]/80 text-lg leading-relaxed">
              {personalInfo.about}
            </p>
          </div>

          {/* Right — Stats grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card p-6 rounded-xl border border-[#DC2626]/10 hover:border-[#DC2626]/30 transition-all duration-300"
                style={{ background: "#1A1A2E" }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#DC2626]">
                  {stat.value}
                </div>
                <div className="mt-2 text-[#E5E5E5]/60 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itachi quote */}
        <div ref={quoteRef} className="mt-16 max-w-3xl mx-auto">
          <div className="relative pl-6 border-l-2 border-[#DC2626]">
            <span className="absolute -left-3 -top-2 text-4xl text-[#DC2626] font-serif leading-none">
              &ldquo;
            </span>
            <p className="text-[#E5E5E5]/70 text-lg italic leading-relaxed">
              Knowledge and awareness are vague, and perhaps better called
              illusions.
            </p>
            <span className="text-4xl text-[#DC2626] font-serif leading-none">
              &rdquo;
            </span>
            <p className="mt-3 text-[#DC2626]/70 text-sm tracking-wider uppercase">
              — Itachi Uchiha
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
