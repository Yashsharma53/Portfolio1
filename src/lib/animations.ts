// ──────────────────────────────────────────────
// GSAP Animation Presets
// Theme: Itachi Uchiha — smooth, deliberate reveals
// ──────────────────────────────────────────────

/** Fade in while sliding up */
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  duration: 0.8,
  ease: "power3.out",
};

/** Fade in from the left */
export const fadeInLeft = {
  initial: { opacity: 0, x: -80 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  ease: "power3.out",
};

/** Fade in from the right */
export const fadeInRight = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  ease: "power3.out",
};

/** Scale in from center */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  duration: 0.6,
  ease: "back.out(1.7)",
};

/** Stagger configuration for child elements */
export const staggerChildren = {
  stagger: 0.15,
  ease: "power2.out",
  duration: 0.5,
};

/**
 * Generate a GSAP ScrollTrigger configuration object.
 *
 * @param trigger  CSS selector or element ref for the trigger
 * @param options  Optional overrides
 */
export function scrollTriggerConfig(
  trigger: string,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    toggleActions?: string;
    markers?: boolean;
    once?: boolean;
  } = {}
) {
  const {
    start = "top 85%",
    end = "bottom 20%",
    scrub = false,
    toggleActions = "play none none none",
    markers = false,
    once = true,
  } = options;

  return {
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      toggleActions,
      markers,
      once,
    },
  };
}

/**
 * Text reveal animation config — letters / words clip-reveal.
 * Use with GSAP SplitText or manual span wrapping.
 */
export const textReveal = {
  initial: {
    opacity: 0,
    y: "100%",
    rotateX: -90,
  },
  animate: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
  },
  duration: 0.6,
  ease: "power4.out",
  stagger: 0.03,
};
