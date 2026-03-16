"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/ui/SectionTitle";
import { skills } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

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
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".skill-card");
      const bars = cardsRef.current?.querySelectorAll(".progress-fill");

      // Staggered card reveal
      gsap.from(cards!, {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate progress bar widths
      bars?.forEach((bar) => {
        const target = bar.getAttribute("data-width") || "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${target}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 md:py-32"
      style={{ background: "rgba(10, 10, 10, 0.75)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle title="Skills & Arsenal" />

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-card group relative p-6 rounded-xl border-l-4 border-[#DC2626] transition-all duration-300 hover:shadow-lg hover:shadow-[#DC2626]/10"
              style={{ background: "#1A1A2E" }}
            >
              <h3 className="text-xl font-bold text-[#E5E5E5] mb-4">
                {category.title}
              </h3>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-full border border-[#DC2626]/20 text-[#E5E5E5]/80 bg-[#0A0A0A]/50 hover:border-[#DC2626]/60 hover:text-[#DC2626] transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-auto">
                <div className="flex justify-between text-sm text-[#E5E5E5]/50 mb-2">
                  <span>Proficiency</span>
                  <span>{category.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0A0A0A] rounded-full overflow-hidden">
                  <div
                    className="progress-fill h-full bg-gradient-to-r from-[#DC2626] to-[#B91C1C] rounded-full"
                    data-width={category.proficiency}
                    style={{ width: 0 }}
                  />
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#DC2626]/5 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
