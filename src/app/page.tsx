"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScene, setShowScene] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay scene mount slightly for smoother load
    const timer = setTimeout(() => setShowScene(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <SmoothScroll>
          <Navbar />

          {/* 3D Background Scene */}
          {showScene && (
            <div className="canvas-container">
              <Scene mouseX={mousePos.x} mouseY={mousePos.y} />
            </div>
          )}

          <main ref={mainRef} className="relative z-10" style={{ background: "transparent" }}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />

            {/* Footer */}
            <footer className="relative py-8 text-center border-t border-white/5" style={{ background: "rgba(10,10,10,0.85)" }}>
              <p className="text-sm text-muted">
                &copy; {new Date().getFullYear()} Yash Sharma. Crafted with passion & code.
              </p>
              <p className="text-xs text-muted/50 mt-2">
                &ldquo;Those who cannot acknowledge themselves will eventually fail.&rdquo;
              </p>
            </footer>
          </main>

          <ScrollIndicator />
        </SmoothScroll>
      )}
    </>
  );
}
