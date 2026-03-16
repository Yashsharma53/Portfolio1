"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/ui/SectionTitle";
import { experience } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const locationMap: Record<string, string> = {
  "Suvidha Foundation": "Remote",
  "CETPA Infotech": "Office",
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical timeline line drawing
      gsap.from(lineRef.current!, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          end: "bottom 50%",
          scrub: 1,
        },
      });

      // Animate each timeline card
      const cards = timelineRef.current?.querySelectorAll(".timeline-card");
      cards?.forEach((card, i) => {
        const direction = i % 2 === 0 ? -60 : 60;
        gsap.from(card, {
          x: direction,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Animate timeline dots
      const dots = timelineRef.current?.querySelectorAll(".timeline-dot");
      dots?.forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: dot,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 md:py-32"
      style={{ background: "rgba(10, 10, 10, 0.75)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle title="Experience" />

        <div ref={timelineRef} className="relative mt-12">
          {/* Vertical center line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#DC2626] via-[#DC2626]/50 to-transparent"
          />

          <div className="flex flex-col gap-12">
            {experience.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={exp.company}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#DC2626] border-4 border-[#0A0A0A] z-10 mt-8" />

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div
                    className={`timeline-card ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div
                      className="p-6 rounded-xl border border-[#DC2626]/10 hover:border-[#DC2626]/30 transition-all duration-300"
                      style={{ background: "#1A1A2E" }}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <h3 className="text-xl font-bold text-[#E5E5E5]">
                            {exp.role}
                          </h3>
                          <p className="text-[#DC2626] font-medium mt-1">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[#E5E5E5]/50 text-sm">
                            {exp.duration}
                          </span>
                          <div className="flex items-center gap-1 mt-1 text-[#E5E5E5]/40 text-xs">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {locationMap[exp.company] || "On-site"}
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 text-[#E5E5E5]/60 text-sm leading-relaxed">
                        {exp.description}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {exp.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[#E5E5E5]/50 text-sm"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#DC2626] shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
