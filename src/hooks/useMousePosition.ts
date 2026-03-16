"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface MousePosition {
  /** Normalized X position: -1 (left) to 1 (right) */
  x: number;
  /** Normalized Y position: -1 (top) to 1 (bottom) */
  y: number;
  /** Raw pixel X */
  rawX: number;
  /** Raw pixel Y */
  rawY: number;
}

/**
 * Tracks the mouse position normalized to -1 … 1 for parallax effects.
 *
 * @param throttleMs  Minimum interval between updates (default 16 ms ≈ 60 fps)
 */
export function useMousePosition(throttleMs = 16): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });

  const lastUpdate = useRef(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate.current < throttleMs) return;
      lastUpdate.current = now;

      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / innerHeight) * 2 - 1;

      setPosition({
        x: normalizedX,
        y: normalizedY,
        rawX: e.clientX,
        rawY: e.clientY,
      });
    },
    [throttleMs]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
