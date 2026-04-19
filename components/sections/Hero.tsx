"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

import MagneticButton from "@/components/MagneticButton";
import {
  GoldenOrb,
  AscendingDots,
  DecorativeLine,
} from "@/components/SVGElements";
import { EASING, TIMING, STAGGER, createTimeline } from "@/lib/animations";

const headingLines = [["Pancarkan"], ["Pesona", "Natural"], ["Anda."]];

type HeroProps = {
  onBookingOpen: () => void;
};

export default function Hero({ onBookingOpen }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ovalRef = useRef<HTMLDivElement>(null);
  const scrollPulseRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const heading = headingRef.current;
    const subcopy = subcopyRef.current;
    const cta = ctaRef.current;
    const oval = ovalRef.current;
    const pulse = scrollPulseRef.current;

    if (
      !section ||
      !eyebrow ||
      !heading ||
      !subcopy ||
      !cta ||
      !oval ||
      !pulse
    ) {
      return undefined;
    }

    const words = heading.querySelectorAll<HTMLElement>("[data-word]");
    const runEntrance = () => {
      gsap.set(eyebrow, {
        opacity: 0,
        y: 8,
      });

      gsap.set(words, {
        opacity: 0,
        y: 60,
      });

      gsap.set(subcopy, {
        opacity: 0,
        y: 16,
      });

      gsap.set(cta, {
        opacity: 0,
        y: 12,
      });

      gsap.set(oval, {
        opacity: 0,
        scale: 0.92,
      });

      const tl = createTimeline();
      timelineRef.current = tl;

      // Eyebrow entrance - establishes context
      tl.to(eyebrow, {
        opacity: 1,
        y: 0,
        delay: TIMING.DELAY_SHORT,
        duration: TIMING.SHORT,
        ease: EASING.ENTRANCE,
      });

      // Main heading words - staggered for dramatic effect
      tl.to(
        words,
        {
          y: 0,
          opacity: 1,
          stagger: STAGGER.STANDARD,
          duration: TIMING.INTRO_ELEMENTS,
          ease: EASING.ENTRANCE,
        },
        "<+0.05",
      );

      // Decorative oval - scale up in parallel
      tl.to(
        oval,
        {
          opacity: 1,
          scale: 1,
          duration: TIMING.INTRO_SECTION,
          ease: EASING.SMOOTH,
        },
        0.4,
      );

      // Subheading - after heading completes
      tl.to(
        subcopy,
        {
          opacity: 1,
          y: 0,
          duration: TIMING.SHORT,
          ease: EASING.ENTRANCE,
        },
        0.9,
      );

      // CTA buttons - final entrance
      tl.to(
        cta,
        {
          opacity: 1,
          y: 0,
          duration: TIMING.SHORT,
          ease: EASING.ENTRANCE,
        },
        1.1,
      );
    };

    runEntrance();

    const pulseTween = gsap.to(pulse, {
      y: 22,
      opacity: 0,
      duration: TIMING.INTRO_SECTION,
      ease: EASING.SCROLL,
      repeat: -1,
    });

    return () => {
      pulseTween.kill();
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-canvas"
    >
      <div className="w-full px-[6vw] pb-20 pt-[14vh] lg:px-[8vw] lg:pb-0 lg:pt-[15vh]">
        <div className="w-full lg:max-w-[55%]">
          <p
            ref={eyebrowRef}
            className="mb-8 font-sans text-[10px] uppercase tracking-[0.25em] text-gold sm:text-[11px]"
          >
            JGLOW AESTHETIC CLINIC
          </p>

          <div className="relative">
            {/* Decorative SVG element - top left */}
            <div className="absolute -top-12 -left-8 w-24 h-24 opacity-20 pointer-events-none hidden sm:block">
              <GoldenOrb />
            </div>

            <h1
              ref={headingRef}
              className="font-display text-[clamp(44px,9vw,140px)] font-light leading-[0.93] text-charcoal relative z-10"
            >
              {headingLines.map((line, lineIndex) => (
                <span key={`line-${lineIndex}`} className="block">
                  {line.map((word, wordIndex) => (
                    <span
                      key={`${word}-${wordIndex}`}
                      className="inline-block overflow-hidden pr-[0.18em]"
                    >
                      <span data-word className="inline-block">
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Decorative SVG element - bottom right */}
            <div className="absolute -bottom-8 right-0 w-20 h-20 opacity-15 pointer-events-none hidden sm:block">
              <AscendingDots />
            </div>
          </div>

          <p
            ref={subcopyRef}
            className="mt-10 max-w-xl whitespace-pre-line font-sans text-[13px] font-light leading-[1.8] tracking-[0.08em] text-muted sm:text-[14px]"
          >
            {
              "Perawatan estetika berbasis sains.\nDirancang untuk kulit Indonesia."
            }
          </p>

          {/* Decorative line */}
          <div className="mt-8 w-16 h-0.5 bg-gradient-to-r from-gold to-transparent hidden sm:block" />

          <div
            ref={ctaRef}
            className="mt-12 flex flex-wrap items-center gap-6 sm:mt-16 sm:gap-8"
          >
            <MagneticButton
              cursor="view"
              onClick={onBookingOpen}
              className="border border-charcoal bg-transparent px-8 py-4 font-sans text-[12px] uppercase tracking-[0.15em] text-charcoal transition-colors duration-500 hover:bg-charcoal hover:text-canvas sm:px-9 sm:text-[13px]"
            >
              Reservasi Sekarang
            </MagneticButton>

            <a
              href="#treatments"
              className="font-sans text-[12px] tracking-[0.1em] text-muted underline underline-offset-4 sm:text-[13px]"
            >
              Lihat Layanan →
            </a>
          </div>
        </div>
      </div>

      <div
        ref={ovalRef}
        data-cursor="expand"
        className="absolute right-[-2vw] top-1/2 hidden h-[560px] w-[480px] -translate-y-1/2 overflow-hidden md:block"
        style={{ clipPath: "ellipse(48% 45% at 50% 50%)" }}
      >
        <div className="flex h-full w-full items-center justify-center bg-rose">
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
            VIDEO PLACEHOLDER
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <div className="relative h-[60px] w-px overflow-hidden bg-gold/40">
          <span
            ref={scrollPulseRef}
            className="absolute left-0 top-0 h-5 w-px bg-gold"
          />
        </div>
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
          SCROLL
        </span>
      </div>
    </section>
  );
}
