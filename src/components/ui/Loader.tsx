"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [show, setShow] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 2.5,
      onComplete: () => {
        setShow(false);
        onComplete?.();
      },
    });

    tl.to(loaderRef.current, {
      opacity: 0,
      y: -60,
      duration: 0.8,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{ background: "#000" }}
    >
      {/* Sharingan Spinner */}
      <div className="sharingan-container">
        <div className="sharingan-outer">
          {/* Inner pupil */}
          <div className="sharingan-pupil" />
          {/* Three tomoe */}
          <div className="sharingan-tomoe-ring">
            <div className="tomoe tomoe-1" />
            <div className="tomoe tomoe-2" />
            <div className="tomoe tomoe-3" />
          </div>
          {/* Ring lines */}
          <div className="sharingan-ring" />
        </div>
      </div>

      {/* Loading text */}
      <p
        className="mt-8 text-sm font-light uppercase tracking-[0.4em]"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Loading...
      </p>

      <style jsx>{`
        .sharingan-container {
          width: 100px;
          height: 100px;
          position: relative;
        }

        .sharingan-outer {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, #1a0000 30%, #0a0a0a 70%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px rgba(220, 38, 38, 0.3),
            0 0 80px rgba(220, 38, 38, 0.1);
        }

        .sharingan-pupil {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #DC2626;
          position: absolute;
          z-index: 3;
          box-shadow: 0 0 12px rgba(220, 38, 38, 0.8);
        }

        .sharingan-ring {
          position: absolute;
          width: 66px;
          height: 66px;
          border: 2px solid rgba(220, 38, 38, 0.5);
          border-radius: 50%;
          z-index: 1;
        }

        .sharingan-tomoe-ring {
          position: absolute;
          width: 66px;
          height: 66px;
          z-index: 2;
          animation: spinTomoe 1.8s linear infinite;
        }

        .tomoe {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #DC2626;
          border-radius: 50% 0 50% 50%;
          box-shadow: 0 0 6px rgba(220, 38, 38, 0.6);
        }

        .tomoe::after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          background: #DC2626;
          border-radius: 50%;
          top: -3px;
          right: -1px;
        }

        .tomoe-1 {
          top: -6px;
          left: 50%;
          transform: translateX(-50%) rotate(0deg);
        }

        .tomoe-2 {
          bottom: 4px;
          left: 2px;
          transform: rotate(120deg);
        }

        .tomoe-3 {
          bottom: 4px;
          right: 2px;
          transform: rotate(240deg);
        }

        @keyframes spinTomoe {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
