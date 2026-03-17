"use client";

import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div style={{ marginBottom: "4rem" }}>
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#ffffff",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          marginTop: "1rem",
          height: "3px",
          width: "80px",
          borderRadius: "9999px",
          background: "#DC2626",
        }}
      />
      {subtitle && (
        <p
          style={{
            marginTop: "1rem",
            maxWidth: "36rem",
            fontSize: "1rem",
            lineHeight: "1.75",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
