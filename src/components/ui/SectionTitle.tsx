"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        lineRef.current,
        {
          scaleX: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [subtitle]);

  return (
    <div ref={containerRef} className="mb-16">
      <h2
        ref={headingRef}
        className="text-4xl font-bold uppercase tracking-wider text-white md:text-5xl"
      >
        {title}
      </h2>
      <div
        ref={lineRef}
        className="mt-4 h-[3px] w-20 origin-left rounded-full"
        style={{ background: "#DC2626" }}
      />
      {subtitle && (
        <p
          ref={subtitleRef}
          className="mt-4 max-w-xl text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
