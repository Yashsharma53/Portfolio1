"use client";

import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { experience } from "@/data/portfolio";

const locationMap: Record<string, string> = {
  "Suvidha Foundation": "Remote",
  "CETPA Infotech": "Office",
};

export default function Experience() {
  return (
    <section
      id="experience"
      style={{ background: "transparent", paddingTop: "1rem", paddingBottom: "10rem" }}
    >
      <div className="section-container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1.25rem, 3vw, 3rem)" }}>
        <SectionTitle title="Experience" />

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1rem" }}>
          {experience.map((exp, index) => (
            <div
              key={exp.company}
              className="amaterasu-hover"
              style={{
                background: "rgba(26, 26, 46, 0.85)",
                borderRadius: "16px",
                border: "1px solid rgba(220, 38, 38, 0.15)",
                overflow: "hidden",
                transition: "transform 0.4s ease, border-color 0.4s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.15)";
              }}
            >
              {/* Left red accent */}
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "4px",
                background: "linear-gradient(to bottom, #DC2626, #991B1B)",
              }} />

              <div style={{ padding: "clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2.5rem)", marginLeft: "4px" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                    {/* Number */}
                    <div className="entry-number" style={{
                      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                      fontWeight: "900",
                      color: "rgba(220, 38, 38, 0.15)",
                      lineHeight: "1",
                      fontFamily: "monospace",
                      userSelect: "none",
                    }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h3 className="exp-title" style={{
                        fontSize: "1.35rem",
                        fontWeight: "bold",
                        color: "#E5E5E5",
                        marginBottom: "4px",
                      }}>
                        {exp.role}
                      </h3>
                      <span style={{
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        color: "#DC2626",
                      }}>
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  {/* Duration & Location */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="exp-duration" style={{
                      fontSize: "0.85rem",
                      color: "rgba(229, 229, 229, 0.5)",
                      marginBottom: "4px",
                    }}>
                      {exp.duration}
                    </div>
                    <div className="exp-location" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "3px 10px",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(229, 229, 229, 0.5)",
                      background: "rgba(220, 38, 38, 0.08)",
                      borderRadius: "4px",
                      border: "1px solid rgba(220, 38, 38, 0.15)",
                    }}>
                      <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {locationMap[exp.company] || "On-site"}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="exp-desc" style={{
                  color: "rgba(229, 229, 229, 0.65)",
                  fontSize: "0.9rem",
                  lineHeight: "1.75",
                  marginBottom: "1.2rem",
                }}>
                  {exp.description}
                </p>

                {/* Highlights */}
                <div style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(220, 38, 38, 0.1)",
                }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {exp.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="exp-highlight"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "5px 14px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          borderRadius: "6px",
                          background: "rgba(220, 38, 38, 0.08)",
                          color: "rgba(229, 229, 229, 0.7)",
                          border: "1px solid rgba(220, 38, 38, 0.12)",
                        }}
                      >
                        <span style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#DC2626",
                          flexShrink: 0,
                        }} />
                        {h}
                      </span>
                    ))}
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
