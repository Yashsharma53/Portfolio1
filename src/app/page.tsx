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
  const [scrollProgress, setScrollProgress] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById("about");
      if (!aboutEl) return;
      const heroHeight = window.innerHeight;
      const aboutTop = aboutEl.offsetTop;
      // 0 = top of page, 1 = about section reached, >1 = past about
      const aboutBottom = aboutEl.offsetTop + aboutEl.offsetHeight;
      const progress = Math.max(0, window.scrollY / (aboutTop - heroHeight * 0.3));
      // Clamp to 0-1 for position, but also track fade: 0-1 normal, 1-2 fading out
      const fadeProgress = window.scrollY > aboutTop
        ? 1 + Math.min(1, (window.scrollY - aboutTop) / (aboutBottom - aboutTop))
        : Math.min(1, progress);
      setScrollProgress(fadeProgress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
              <Scene mouseX={mousePos.x} mouseY={mousePos.y} scrollProgress={scrollProgress} />
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
              {/* Social icons */}
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "16px" }}>
                <a href="https://github.com/Yashsharma53/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(229,229,229,0.5)", transition: "color 0.3s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229,229,229,0.5)")}>
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                </a>
                <a href="mailto:yashyahoo2000@gmail.com" style={{ color: "rgba(229,229,229,0.5)", transition: "color 0.3s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229,229,229,0.5)")}>
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
                <a href="https://linkedin.com/in/yashsharma" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(229,229,229,0.5)", transition: "color 0.3s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#0A66C2")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229,229,229,0.5)")}>
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://wa.me/917701808288" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(229,229,229,0.5)", transition: "color 0.3s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#25D366")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229,229,229,0.5)")}>
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
              <p className="text-sm text-muted">
                &copy; {new Date().getFullYear()} Yash Sharma. Crafted with passion & code.
              </p>
            </footer>
          </main>

          <ScrollIndicator />
        </SmoothScroll>
      )}
    </>
  );
}
