"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const pastViewport = window.scrollY > window.innerHeight * 0.3;
      if (pastViewport && visible) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => setVisible(false),
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-30 flex flex-col items-center gap-4"
    >
      {/* SCROLL text rotated vertically */}
      <div
        className="text-[10px] font-medium uppercase tracking-[0.35em]"
        style={{
          writingMode: "vertical-rl",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.35em",
        }}
      >
        SCROLL
      </div>

      {/* Animated line + arrow */}
      <div className="flex flex-col items-center">
        <div
          className="scroll-indicator-line"
          style={{
            width: "1px",
            height: "48px",
            background: "rgba(255,255,255,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="scroll-indicator-pulse"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: "#DC2626",
            }}
          />
        </div>
        {/* Arrow */}
        <svg
          className="scroll-indicator-arrow mt-1"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ color: "#DC2626" }}
        >
          <path
            d="M6 1L6 11M6 11L1 6M6 11L11 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style jsx>{`
        .scroll-indicator-pulse {
          animation: scrollPulse 2s ease-in-out infinite;
        }

        .scroll-indicator-arrow {
          animation: scrollBounce 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(200%);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        @keyframes scrollBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}</style>
    </div>
  );
}
