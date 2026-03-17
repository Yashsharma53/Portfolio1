"use client";

import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects } from "@/data/portfolio";

const projectHighlights: Record<string, string[]> = {
  "Skin Lesion Segmentation": [
    "ResUNet architecture for precise boundary delineation",
    "Trained on ISIC 2019 dataset with advanced augmentation",
    "Deep learning with Keras, TensorFlow, OpenCV for image pre-processing",
  ],
  "Iris Flower Classification": [
    "SVM-based classification with high accuracy",
    "Complete ML pipeline from preprocessing to evaluation",
    "Multi-class classification across three species",
  ],
};

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ background: "transparent", paddingTop: "1rem", paddingBottom: "6rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 3rem" }}>
        <SectionTitle title="Projects" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", marginTop: "1rem" }}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="amaterasu-hover"
              style={{
                background: "rgba(26, 26, 46, 0.85)",
                borderRadius: "16px",
                border: "1px solid rgba(220, 38, 38, 0.15)",
                padding: "0",
                overflow: "hidden",
                transition: "transform 0.4s ease, border-color 0.4s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.15)";
              }}
            >
              {/* Top accent bar */}
              <div style={{
                height: "3px",
                background: "linear-gradient(to right, #DC2626, #991B1B, transparent)",
              }} />

              <div style={{ padding: "2.5rem 3rem" }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  {/* Project number */}
                  <div style={{
                    fontSize: "3rem",
                    fontWeight: "900",
                    color: "rgba(220, 38, 38, 0.15)",
                    lineHeight: "1",
                    fontFamily: "monospace",
                    flexShrink: 0,
                    userSelect: "none",
                  }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div style={{ flex: 1 }}>
                    {/* Title */}
                    <h3 style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#E5E5E5",
                      letterSpacing: "0.02em",
                      marginBottom: "0.5rem",
                    }}>
                      {project.title}
                    </h3>

                    {/* Dataset badge */}
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#DC2626",
                      background: "rgba(220, 38, 38, 0.1)",
                      borderRadius: "4px",
                      border: "1px solid rgba(220, 38, 38, 0.2)",
                    }}>
                      {project.dataset}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: "rgba(229, 229, 229, 0.7)",
                  fontSize: "0.95rem",
                  lineHeight: "1.8",
                  marginBottom: "1.5rem",
                }}>
                  {project.description}
                </p>

                {/* Highlights */}
                <div style={{ marginBottom: "1.5rem" }}>
                  {projectHighlights[project.title]?.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "8px",
                        fontSize: "0.85rem",
                        color: "rgba(229, 229, 229, 0.6)",
                      }}
                    >
                      <span style={{
                        marginTop: "7px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#DC2626",
                        flexShrink: 0,
                      }} />
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* Footer: Tech stack + Link */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(220, 38, 38, 0.1)",
                }}>
                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "5px 14px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          borderRadius: "6px",
                          background: "rgba(220, 38, 38, 0.08)",
                          color: "rgba(220, 38, 38, 0.9)",
                          border: "1px solid rgba(220, 38, 38, 0.15)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* View link */}
                  <a
                    href={project.link}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#DC2626",
                      textDecoration: "none",
                      transition: "gap 0.3s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.gap = "10px"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.gap = "6px"; }}
                  >
                    View Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
