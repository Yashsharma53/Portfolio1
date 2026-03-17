"use client";

import React, { useEffect, useRef } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { skills } from "@/data/portfolio";

interface SkillCategory {
  title: string;
  items: string[];
  proficiency: number;
}

const skillCategories: SkillCategory[] = [
  { title: "Languages", items: skills.languages, proficiency: 85 },
  { title: "Frameworks", items: skills.frameworks, proficiency: 80 },
  { title: "Database", items: skills.databases, proficiency: 75 },
  { title: "Technologies", items: skills.domains, proficiency: 78 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate progress bars when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = cardsRef.current?.querySelectorAll(".progress-fill") as NodeListOf<HTMLElement>;
            bars?.forEach((bar) => {
              const target = bar.getAttribute("data-width") || "0";
              bar.style.width = `${target}%`;
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{ background: "transparent", paddingTop: "1rem", paddingBottom: "10rem" }}
    >
      <div className="section-container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1.25rem, 3vw, 3rem)" }}>
        <SectionTitle title="Skills & Arsenal" />

        <div ref={cardsRef} className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(1.5rem, 3vw, 3rem)" }}>
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="amaterasu-hover"
              style={{
                background: "#1A1A2E",
                borderLeft: "4px solid #DC2626",
                borderRadius: "12px",
                padding: "24px",
                position: "relative",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#E5E5E5", marginBottom: "16px" }}>
                {category.title}
              </h3>

              {/* Skill tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                {category.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "6px 12px",
                      fontSize: "0.875rem",
                      borderRadius: "9999px",
                      border: "1px solid rgba(220, 38, 38, 0.2)",
                      color: "rgba(229, 229, 229, 0.8)",
                      background: "rgba(10, 10, 10, 0.5)",
                      transition: "border-color 0.2s, color 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.6)";
                      e.currentTarget.style.color = "#DC2626";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.2)";
                      e.currentTarget.style.color = "rgba(229, 229, 229, 0.8)";
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Progress bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "rgba(229,229,229,0.5)", marginBottom: "8px" }}>
                  <span>Proficiency</span>
                  <span>{category.proficiency}%</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#0A0A0A", borderRadius: "9999px", overflow: "hidden" }}>
                  <div
                    className="progress-fill"
                    data-width={category.proficiency}
                    style={{
                      width: "0%",
                      height: "100%",
                      background: "linear-gradient(to right, #DC2626, #B91C1C)",
                      borderRadius: "9999px",
                      transition: "width 1.2s ease-out",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
