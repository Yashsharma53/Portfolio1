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
      gsap.fromTo(textRef.current!,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stats cards — no animation, always visible

      // Quote fade in
      gsap.fromTo(quoteRef.current!,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
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
      <div className="w-full" style={{ paddingLeft: "50%", paddingRight: "3rem" }}>
        {/* Heading — pushed lower with top margin */}
        <div style={{ marginTop: "3rem" }}>
          <SectionTitle title="About Me" />
        </div>

        {/* About text — with generous spacing from heading */}
        <div ref={textRef} style={{ marginTop: "3rem" }}>
          <p className="text-[#E5E5E5]/80 text-lg leading-loose">
            {personalInfo.about}
          </p>
        </div>

        {/* Stats */}
        <div style={{ marginTop: "3rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(220, 38, 38, 0.08)",
                  border: "1px solid rgba(220, 38, 38, 0.3)",
                  borderRadius: "12px",
                  padding: "24px",
                  minWidth: "120px",
                  flex: "1",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)")}
              >
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#DC2626" }}>
                  {stat.value}
                </div>
                <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "rgba(229,229,229,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itachi quote */}
        <div ref={quoteRef} style={{ marginTop: "3rem" }}>
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
