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

  // Animations removed — content always visible

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: "linear-gradient(to right, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.3) 45%, rgba(10, 10, 10, 0.95) 50%, rgba(10, 10, 10, 0.95) 100%)", paddingTop: "1rem", paddingBottom: "6rem" }}
    >
      <div className="w-full about-content" style={{ paddingLeft: "clamp(1.5rem, 50vw, 50%)", paddingRight: "clamp(1.5rem, 3vw, 3rem)" }}>
        {/* Heading */}
        <div style={{ marginTop: "0" }}>
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
                className="amaterasu-hover"
                style={{
                  background: "rgba(220, 38, 38, 0.08)",
                  border: "1px solid rgba(220, 38, 38, 0.3)",
                  borderRadius: "12px",
                  padding: "24px",
                  minWidth: "120px",
                  flex: "1",
                  transition: "border-color 0.3s ease",
                }}
              >
                <div className="stat-value" style={{ fontSize: "2rem", fontWeight: "bold", color: "#DC2626" }}>
                  {stat.value}
                </div>
                <div className="stat-label" style={{ marginTop: "8px", fontSize: "0.75rem", color: "rgba(229,229,229,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
