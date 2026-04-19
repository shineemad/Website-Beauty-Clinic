/**
 * GSAP Animation Configuration & Constants
 * Centralized animation system untuk consistency across site
 */

import gsap from "gsap";

/**
 * Global Easing Curves - Premium & Cinematic
 * Terbatas ke 4 kurva untuk consistency
 */
export const EASING = {
  // Entrance animations - power & elegance
  ENTRANCE: "power3.out", // 0.17, 0.67, 0.83, 0.67

  // Smooth transitions - balance & grace
  SMOOTH: "power2.out", // 0.25, 0.46, 0.45, 0.94

  // Scroll interactions - cinematic feel
  SCROLL: "power4.inOut", // 0.25, 0.1, 0.25, 1

  // Hover/interactive - snappy responsiveness
  INTERACT: "power2.inOut", // 0.455, 0.03, 0.515, 0.955
} as const;

/**
 * Timing Constants (seconds)
 */
export const TIMING = {
  // Short micro-interactions
  MICRO: 0.3,

  // Standard transitions
  SHORT: 0.6,
  MEDIUM: 0.8,
  LONG: 1.0,

  // Entrance animations
  INTRO_SECTION: 1.2,
  INTRO_ELEMENTS: 0.8,

  // Scroll-triggered animations
  SCROLL_STAGGER: 0.08,
  SCROLL_DURATION: 0.8,

  // Delays
  DELAY_SHORT: 0.1,
  DELAY_MEDIUM: 0.2,
  DELAY_LONG: 0.4,
} as const;

/**
 * Stagger Patterns - Predictable, elegant cascades
 */
export const STAGGER = {
  // Fine grain - individual words/letters
  FINE: 0.03,

  // Standard - list items, array elements
  STANDARD: 0.08,

  // Generous - major sections, large gaps
  GENEROUS: 0.12,

  // Sequential - one after another
  SEQUENTIAL: { amount: 0.2, each: 0.08 },

  // Grid - natural scanning pattern
  GRID: { amount: 0.4, grid: [4, 4], from: "edges" },
} as const;

/**
 * Preset Animation Sequences
 */
export const SEQUENCES = {
  /**
   * Entrance animation for elements
   * @param element - DOM element or selector
   * @param options - Custom options
   */
  fadeInUp: (element: any, options = {}) => {
    return gsap.from(element, {
      opacity: 0,
      y: 20,
      duration: TIMING.MEDIUM,
      ease: EASING.ENTRANCE,
      ...options,
    });
  },

  /**
   * Scale entrance with opacity
   */
  scaleIn: (element: any, options = {}) => {
    return gsap.from(element, {
      opacity: 0,
      scale: 0.92,
      duration: TIMING.MEDIUM,
      ease: EASING.ENTRANCE,
      ...options,
    });
  },

  /**
   * Staggered word reveal animation
   */
  wordReveal: (words: NodeListOf<Element>, options = {}) => {
    return gsap.from(words, {
      opacity: 0,
      y: 60,
      stagger: STAGGER.STANDARD,
      duration: TIMING.INTRO_ELEMENTS,
      ease: EASING.ENTRANCE,
      ...options,
    });
  },

  /**
   * Staggered item list animation
   */
  listStagger: (items: any, options = {}) => {
    return gsap.from(items, {
      opacity: 0,
      y: 12,
      stagger: STAGGER.STANDARD,
      duration: TIMING.SHORT,
      ease: EASING.ENTRANCE,
      ...options,
    });
  },

  /**
   * Smooth scroll-triggered animation
   */
  scrollReveal: (element: any, options: any = {}) => {
    const { scrollTrigger: scrollTriggerOptions, ...restOptions } = options;
    return gsap.to(element, {
      opacity: 1,
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        end: "top 25%",
        scrub: 0.5,
        ...(scrollTriggerOptions || {}),
      },
      ...restOptions,
    });
  },

  /**
   * Hover scale interaction
   */
  hoverScale: (element: any, scale = 1.05, duration = TIMING.MICRO) => {
    gsap.to(element, {
      scale: scale,
      duration: duration,
      ease: EASING.INTERACT,
      overwrite: "auto",
    });
  },

  hoverScaleRevert: (element: any, duration = TIMING.MICRO) => {
    gsap.to(element, {
      scale: 1,
      duration: duration,
      ease: EASING.INTERACT,
      overwrite: "auto",
    });
  },
} as const;

/**
 * Timeline Helpers
 */
export const createTimeline = (options = {}) => {
  return gsap.timeline({
    defaults: {
      duration: TIMING.MEDIUM,
      ease: EASING.ENTRANCE,
    },
    ...options,
  });
};

/**
 * Delay Calculator for staggered animations
 */
export const calculateDelay = (
  index: number,
  staggerValue: number = STAGGER.STANDARD,
) => {
  return index * staggerValue;
};

/**
 * Media query context for responsive animations
 */
export const getAnimationConfig = (isMobile: boolean) => {
  return {
    duration: isMobile ? TIMING.SHORT : TIMING.MEDIUM,
    stagger: isMobile ? STAGGER.FINE : STAGGER.STANDARD,
    distance: isMobile ? 12 : 20,
  };
};

/**
 * Viewport intersection helper for scroll animations
 */
export const observeElementEntry = (element: Element, callback: () => void) => {
  if (!("IntersectionObserver" in window)) {
    callback();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  observer.observe(element);
};

export default {
  EASING,
  TIMING,
  STAGGER,
  SEQUENCES,
  createTimeline,
  calculateDelay,
  getAnimationConfig,
  observeElementEntry,
};
