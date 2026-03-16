"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Returns the overall page scroll progress as a value from 0 to 1.
 *
 * 0 = top of page, 1 = fully scrolled to bottom.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      setProgress(scrollProgress);
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Calculate initial value
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return progress;
}
