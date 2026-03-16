"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/ui/SectionTitle";
import MagneticButton from "@/components/ui/MagneticButton";
import { projects } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".project-card");

      cards?.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projectHighlights: Record<string, string[]> = {
    "Skin Lesion Segmentation": [
      "ResUNet architecture for precise boundary delineation",
      "Trained on ISIC 2019 dataset with advanced augmentation",
      "Medical imaging application for dermatology",
    ],
    "Iris Flower Classification": [
      "SVM-based classification with high accuracy",
      "Complete ML pipeline from preprocessing to evaluation",
      "Multi-class classification across three species",
    ],
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 md:py-32"
      style={{ background: "rgba(10, 10, 10, 0.75)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle title="Projects" />

        <div ref={cardsRef} className="flex flex-col gap-10 mt-12">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
              style={{ background: "#1A1A2E" }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC2626]/30 via-transparent to-[#DC2626]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="relative p-8 md:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Project info */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#E5E5E5] group-hover:text-[#DC2626] transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="mt-4 text-[#E5E5E5]/70 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="mt-6 space-y-2">
                      {projectHighlights[project.title]?.map(
                        (highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-[#E5E5E5]/60 text-sm"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0" />
                            {highlight}
                          </li>
                        )
                      )}
                    </ul>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Dataset badge */}
                    <div className="mt-4 text-xs text-[#E5E5E5]/40 uppercase tracking-wider">
                      Dataset: {project.dataset}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex lg:flex-col gap-3 shrink-0 lg:items-end">
                    <MagneticButton href={project.link} variant="outlined">
                      View Details
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
