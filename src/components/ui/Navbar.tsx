"use client";

import { useState, useEffect, useCallback } from "react";
import { triggerCrows } from "@/lib/crowEvent";

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
  const [lightMode, setLightMode] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const toggleTheme = useCallback(() => {
    triggerCrows();
    setLightMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const heroEl = document.getElementById("home");
      if (heroEl) {
        setPastHero(window.scrollY > heroEl.offsetHeight - 100);
      }
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
          /* FULL width at top → slightly narrower pill on scroll */
          top: scrolled ? "12px" : "0px",
          left: scrolled ? "50%" : "0",
          transform: scrolled ? "translateX(-50%)" : "translateX(0)",
          width: scrolled ? "min(96%, 1200px)" : "100%",
          borderRadius: scrolled ? "16px" : "0px",
          background: scrolled
            ? (lightMode ? "rgba(255, 248, 231, 0.95)" : "rgba(10, 10, 10, 0.88)")
            : (lightMode ? "rgba(245, 235, 210, 0.85)" : "rgba(10, 10, 10, 0.6)"),
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
            : lightMode ? "1px solid rgba(180, 160, 120, 0.25)" : "1px solid rgba(255,255,255,0.04)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(220,38,38,0.06)"
            : lightMode ? "0 2px 8px rgba(80, 50, 20, 0.08)" : "none",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between transition-all duration-700"
          style={{
            maxWidth: "100%",
            padding: scrolled ? "14px clamp(16px, 4vw, 48px)" : "16px clamp(20px, 5vw, 64px)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="amaterasu-hover"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              background: "none",
              border: "2px solid rgba(220, 38, 38, 0.3)",
              borderRadius: "10px",
              padding: scrolled ? "6px 14px" : "8px 16px",
              cursor: "pointer",
              transition: "all 0.5s ease",
              position: "relative",
              overflow: "visible",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.7)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(220, 38, 38, 0.2), inset 0 0 15px rgba(220, 38, 38, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span style={{
              fontSize: scrolled ? "20px" : "22px",
              fontWeight: "900",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.12em",
              color: "#DC2626",
              transition: "all 0.5s ease",
            }}>
              Y
            </span>
            <span style={{
              fontSize: scrolled ? "20px" : "22px",
              fontWeight: "900",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.12em",
              color: lightMode ? "#2D1F0E" : "#E5E5E5",
              transition: "all 0.5s ease",
            }}>
              S
            </span>
            <span style={{
              fontSize: scrolled ? "26px" : "28px",
              fontWeight: "900",
              color: "#DC2626",
              lineHeight: "0.6",
              marginLeft: "1px",
              transition: "all 0.5s ease",
            }}>
              .
            </span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden items-center md:flex transition-all duration-500"
            style={{ gap: scrolled ? "28px" : "32px" }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="relative py-1 font-medium uppercase tracking-widest transition-all duration-300"
                    style={{
                      fontSize: scrolled ? "13px" : "13px",
                      color: isActive ? "#DC2626" : (lightMode ? "rgba(45,31,14,0.6)" : "rgba(255,255,255,0.6)"),
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.target as HTMLElement).style.color = lightMode ? "#2D1F0E" : "#fff";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.target as HTMLElement).style.color =
                          lightMode ? "rgba(45,31,14,0.6)" : "rgba(255,255,255,0.6)";
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

          {/* Desktop Theme Toggle — only visible on hero section */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden md:flex items-center justify-center transition-all duration-300"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: "1.5px solid rgba(220, 38, 38, 0.3)",
              background: lightMode ? "rgba(255,248,231,0.4)" : "rgba(255,255,255,0.06)",
              cursor: "pointer",
              color: lightMode ? "#DC2626" : "rgba(255,255,255,0.7)",
              opacity: pastHero ? 0 : 1,
              pointerEvents: pastHero ? "none" : "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.7)";
              e.currentTarget.style.background = lightMode ? "rgba(220,38,38,0.1)" : "rgba(220,38,38,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)";
              e.currentTarget.style.background = lightMode ? "rgba(255,248,231,0.4)" : "rgba(255,255,255,0.06)";
            }}
          >
            {lightMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="relative z-[60] flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[2px] w-6 rounded-full transition-all duration-300"
              style={{
                background: lightMode ? "#2D1F0E" : "#fff",
                transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[2px] w-6 rounded-full transition-all duration-300"
              style={{
                background: lightMode ? "#2D1F0E" : "#fff",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[2px] w-6 rounded-full transition-all duration-300"
              style={{
                background: lightMode ? "#2D1F0E" : "#fff",
                transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
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

      {/* Mobile Slide-in Panel — compact from right */}
      <div
        className={`fixed top-0 right-0 z-40 flex flex-col transition-transform duration-400 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          width: "260px",
          height: "100%",
          background: lightMode ? "rgba(255, 248, 231, 0.97)" : "rgba(10, 10, 10, 0.97)",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(220, 38, 38, 0.15)",
          boxShadow: mobileOpen ? "-8px 0 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {/* Top spacing for navbar */}
        <div style={{ height: "70px" }} />

        {/* Nav links with icons */}
        <div style={{ display: "flex", flexDirection: "column", padding: "12px 0" }}>
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 24px",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? "700" : "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  textAlign: "left",
                  color: isActive ? "#DC2626" : (lightMode ? "rgba(45,31,14,0.6)" : "rgba(255,255,255,0.6)"),
                  background: isActive ? "rgba(220, 38, 38, 0.08)" : "none",
                  border: "none",
                  borderLeft: isActive ? "3px solid #DC2626" : "3px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(30px)",
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                }}
              >
                {/* Icon */}
                <span style={{ width: "20px", height: "20px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {link.label === "Home" && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  )}
                  {link.label === "About" && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                  {link.label === "Skills" && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  )}
                  {link.label === "Projects" && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  )}
                  {link.label === "Experience" && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  )}
                  {link.label === "Contact" && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  )}
                </span>
                {link.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating theme toggle — mobile: always visible, desktop: only after scrolling past hero */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "20px",
          zIndex: 50,
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "2px solid rgba(220, 38, 38, 0.4)",
          background: lightMode ? "rgba(255,248,231,0.92)" : "rgba(10, 10, 10, 0.9)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: lightMode ? "#DC2626" : "rgba(255,255,255,0.7)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(220,38,38,0.1)",
          transition: "all 0.3s ease",
        }}
        className="md:hidden"
      >
        {lightMode ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </>
  );
}
