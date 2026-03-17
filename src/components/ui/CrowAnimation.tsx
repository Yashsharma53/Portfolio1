"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { onCrowTrigger } from "@/lib/crowEvent";

// Bold ink-brush style crow silhouettes — single solid path, pure black
const CROW_PATHS = [
  "M50 25 C48 23 44 20 38 16 C34 13 28 8 24 5 C22 3 20 4 19 6 C17 4 15 5 16 8 C14 6 12 7 14 10 C16 11 20 13 26 16 C22 14 18 12 15 12 C13 12 14 14 17 16 C22 18 30 22 38 24 L50 25 Z M50 25 C52 27 56 30 62 34 C66 37 72 42 76 45 C78 47 80 46 81 44 C83 46 85 45 84 42 C86 44 88 43 86 40 C84 39 80 37 74 34 C78 36 82 38 85 38 C87 38 86 36 83 34 C78 32 70 28 62 26 L50 25 Z M50 22 C50 20 52 19 54 19 C56 19 56 21 54 22 L50 25 Z M38 24 C34 26 30 28 26 32 C24 34 24 36 26 36 C24 38 26 40 28 38 L38 30 Z",
  "M50 30 C46 28 40 24 34 18 C30 14 26 8 24 4 C22 2 20 2 19 4 C17 2 15 3 16 6 C14 4 12 5 14 8 C18 12 24 18 32 22 C28 20 24 16 22 14 C20 12 20 14 22 17 C28 22 36 26 44 28 L50 30 Z M50 30 C54 28 60 24 66 18 C70 14 74 8 76 4 C78 2 80 2 81 4 C83 2 85 3 84 6 C86 4 88 5 86 8 C82 12 76 18 68 22 C72 20 76 16 78 14 C80 12 80 14 78 17 C72 22 64 26 56 28 L50 30 Z M50 27 C50 25 52 24 54 25 C55 26 54 28 52 28 L50 30 Z M44 28 C40 30 36 34 34 36 C32 38 34 40 36 38 L44 32 Z",
  "M45 24 C42 22 38 20 32 17 C28 15 22 12 18 10 C16 8 14 9 14 11 C12 10 11 11 12 13 C10 12 10 14 12 15 C16 17 22 19 30 22 C26 20 22 18 20 18 C18 18 18 20 20 21 C26 24 34 24 40 24 L45 24 Z M45 24 C48 22 52 20 58 17 C62 15 68 12 72 10 C74 8 76 9 76 11 C78 10 79 11 78 13 C80 12 80 14 78 15 C74 17 68 19 60 22 C64 20 68 18 70 18 C72 18 72 20 70 21 C64 24 56 24 50 24 L45 24 Z M45 21 C46 20 48 20 48 21 C49 22 47 23 46 23 L45 24 Z M40 24 C36 26 34 30 32 32 C30 34 32 34 34 32 L40 26 Z",
  "M48 22 C44 20 38 16 30 12 C26 10 20 6 16 4 C14 2 12 3 12 5 C10 4 9 5 10 7 C8 6 8 8 10 9 C14 12 22 16 32 20 C28 18 24 14 20 12 C18 10 16 12 18 14 C24 18 34 22 42 22 L48 22 Z M48 22 C52 24 58 28 66 32 C70 34 76 38 80 40 C82 42 84 41 84 39 C86 40 87 39 86 37 C88 38 88 36 86 35 C82 32 74 28 64 24 C68 26 72 30 76 32 C78 34 80 32 78 30 C72 26 62 22 54 22 L48 22 Z M48 19 C49 18 50 18 51 19 C51 20 50 21 48 21 L48 22 Z M42 22 C38 24 34 28 32 30 C30 32 32 34 34 32 C36 30 40 26 42 24 Z",
];

interface Crow {
  id: number;
  variant: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotation: number;
  scale: number;
  duration: number;
  delay: number;
  flipX: boolean;
}

function generateCrows(): Crow[] {
  const count = 22;
  const crows: Crow[] = [];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
    const dist = window.innerWidth * 0.6 + Math.random() * window.innerWidth * 0.5;

    crows.push({
      id: i,
      variant: Math.floor(Math.random() * CROW_PATHS.length),
      startX: cx + (Math.random() - 0.5) * 120,
      startY: cy + (Math.random() - 0.5) * 120,
      endX: cx + Math.cos(angle) * dist,
      endY: cy + Math.sin(angle) * dist,
      rotation: Math.random() * 360,
      scale: 1 + Math.random() * 0.8,
      duration: 2 + Math.random() * 1.2,
      delay: Math.random() * 0.4,
      flipX: Math.random() > 0.5,
    });
  }
  return crows;
}

export default function CrowAnimation() {
  const [crows, setCrows] = useState<Crow[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const unsub = onCrowTrigger(() => {
      setCrows(generateCrows());
    });
    return () => { unsub(); };
  }, []);

  useEffect(() => {
    if (crows.length === 0 || !containerRef.current) return;

    const els = containerRef.current.querySelectorAll<HTMLElement>(".crow-el");
    if (els.length === 0) return;

    tlRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => setCrows([]),
    });
    tlRef.current = tl;

    els.forEach((el, i) => {
      const crow = crows[i];
      if (!crow) return;

      gsap.set(el, {
        x: crow.startX,
        y: crow.startY,
        scale: 0,
        opacity: 0,
        rotation: 0,
      });

      tl.to(
        el,
        {
          x: crow.endX,
          y: crow.endY,
          scale: crow.scale,
          opacity: 0,
          rotation: crow.rotation,
          duration: crow.duration,
          ease: "power2.out",
          keyframes: {
            opacity: [0, 1, 1, 0],
            scale: [0, crow.scale, crow.scale, crow.scale * 0.6],
          },
        },
        crow.delay
      );
    });

    return () => { tl.kill(); };
  }, [crows]);

  if (crows.length === 0) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 55,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {crows.map((crow) => (
        <div
          key={crow.id}
          className="crow-el"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            willChange: "transform, opacity",
          }}
        >
          <svg
            width="100"
            height="55"
            viewBox="0 0 100 50"
            style={{
              transform: crow.flipX ? "scaleX(-1)" : undefined,
              overflow: "visible",
            }}
          >
            <path d={CROW_PATHS[crow.variant]} fill="#000" />
            <circle cx={[52, 52, 47, 50][crow.variant]} cy={[21, 26, 20, 19][crow.variant]} r="2" fill="#DC2626" />
          </svg>
        </div>
      ))}
    </div>
  );
}
