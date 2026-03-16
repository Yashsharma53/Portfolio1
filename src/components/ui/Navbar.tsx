"use client";

import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav
        className="fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{
          /* FULL width at top → shrinks to pill on scroll */
          top: scrolled ? "12px" : "0px",
          left: scrolled ? "50%" : "0",
          transform: scrolled ? "translateX(-50%)" : "translateX(0)",
          width: scrolled ? "min(92%, 900px)" : "100%",
          borderRadius: scrolled ? "16px" : "0px",
          background: scrolled
            ? "rgba(10, 10, 10, 0.88)"
            : "rgba(10, 10, 10, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: scrolled
            ? "1px solid rgba(220, 38, 38, 0.18)"
            : "1px solid transparent",
          borderTop: scrolled ? undefined : "none",
          borderLeft: scrolled ? undefined : "none",
          borderRight: scrolled ? undefined : "none",
          borderBottom: scrolled
            ? "1px solid rgba(220, 38, 38, 0.18)"
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(220,38,38,0.06)"
            : "none",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between transition-all duration-700"
          style={{
            maxWidth: scrolled ? "900px" : "1280px",
            padding: scrolled ? "10px 24px" : "16px 40px",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="font-bold tracking-wider transition-all duration-500"
            style={{
              color: "#DC2626",
              fontSize: scrolled ? "20px" : "26px",
            }}
          >
            YS<span className="text-white">.</span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden items-center md:flex transition-all duration-500"
            style={{ gap: scrolled ? "20px" : "32px" }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="relative py-1 font-medium uppercase tracking-widest transition-all duration-300"
                    style={{
                      fontSize: scrolled ? "12px" : "13px",
                      color: isActive ? "#DC2626" : "rgba(255,255,255,0.6)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.target as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.target as HTMLElement).style.color =
                          "rgba(255,255,255,0.6)";
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                        style={{
                          background: "#DC2626",
                          width: scrolled ? "12px" : "16px",
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Hamburger */}
          <button
            className="relative z-[60] flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[2px] w-6 rounded-full bg-white transition-all duration-300"
              style={{
                transform: mobileOpen
                  ? "translateY(7px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block h-[2px] w-6 rounded-full bg-white transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block h-[2px] w-6 rounded-full bg-white transition-all duration-300"
              style={{
                transform: mobileOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 z-40 flex h-full w-[280px] flex-col justify-center transition-transform duration-500 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        <ul className="flex flex-col gap-6 px-10">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li
                key={link.href}
                className="transition-all duration-300"
                style={{
                  transform: mobileOpen ? "translateX(0)" : "translateX(40px)",
                  opacity: mobileOpen ? 1 : 0,
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                }}
              >
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-xl font-medium uppercase tracking-widest transition-colors"
                  style={{
                    color: isActive ? "#DC2626" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
