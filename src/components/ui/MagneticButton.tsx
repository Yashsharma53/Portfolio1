"use client";

import React, { useRef, useState, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "outlined";
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "filled",
  className = "",
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setHovering(false);
  }, []);

  const filledStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
    color: "#fff",
    border: "none",
  };

  const outlinedStyle: React.CSSProperties = {
    background: "transparent",
    color: "#DC2626",
    border: "1px solid #DC2626",
  };

  const baseStyle: React.CSSProperties = {
    ...(variant === "filled" ? filledStyle : outlinedStyle),
    transform: `translate(${offset.x}px, ${offset.y}px) scale(${hovering ? 1.05 : 1})`,
    transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease",
    boxShadow: hovering
      ? variant === "filled"
        ? "0 8px 30px rgba(220, 38, 38, 0.35)"
        : "0 8px 30px rgba(220, 38, 38, 0.15)"
      : "none",
  };

  const variantClass = variant === "filled" ? "magnetic-btn--filled" : "magnetic-btn--outlined";
  const baseClasses = `magnetic-btn ${variantClass} amaterasu-hover inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium uppercase tracking-wider cursor-pointer ${className}`;

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      className={baseClasses}
      style={baseStyle}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
