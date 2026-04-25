"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

import MagneticButton from "@/components/MagneticButton";
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
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollPulseRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const heading = headingRef.current;
    const subcopy = subcopyRef.current;
    const cta = ctaRef.current;
    const frame = frameRef.current;
    const pulse = scrollPulseRef.current;

    if (
      !section ||
      !eyebrow ||
      !heading ||
      !subcopy ||
      !cta ||
      !frame ||
      !pulse
    ) {
      return undefined;
    }

    const words = heading.querySelectorAll<HTMLElement>("[data-word]");

    gsap.set(eyebrow, { opacity: 0, y: 8 });
    gsap.set(words, { opacity: 0, y: 60 });
    gsap.set(subcopy, { opacity: 0, y: 16 });
    gsap.set(cta, { opacity: 0, y: 12 });
    gsap.set(frame, { opacity: 0, scale: 0.96 });

    const tl = createTimeline();
    timelineRef.current = tl;

    tl.to(eyebrow, {
      opacity: 1,
      y: 0,
      delay: TIMING.DELAY_SHORT,
      duration: TIMING.SHORT,
      ease: EASING.ENTRANCE,
    });

    tl.to(
      frame,
      {
        opacity: 1,
        scale: 1,
        duration: TIMING.INTRO_SECTION,
        ease: EASING.SMOOTH,
      },
      0.1,
    );

    tl.to(
      words,
      {
        y: 0,
        opacity: 1,
        stagger: STAGGER.STANDARD,
        duration: TIMING.INTRO_ELEMENTS,
        ease: EASING.ENTRANCE,
      },
      "<+0.1",
    );

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
      className="relative min-h-screen overflow-hidden bg-charcoal"
    >
      {/* Full-bleed cinematic video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1800&q=80&auto=format&fit=crop"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-doing-her-skincare-routine-42955-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/75" />
      </div>

      {/* Decorative editorial frame */}
      <div
        ref={frameRef}
        className="pointer-events-none absolute inset-[4vh_4vw] z-[5] hidden border border-canvas/15 lg:block"
        aria-hidden
      >
        <span className="absolute -left-px -top-px h-10 w-10 border-l border-t border-gold/70" />
        <span className="absolute -right-px -top-px h-10 w-10 border-r border-t border-gold/70" />
        <span className="absolute -bottom-px -left-px h-10 w-10 border-b border-l border-gold/70" />
        <span className="absolute -bottom-px -right-px h-10 w-10 border-b border-r border-gold/70" />
      </div>

      {/* Foreground editorial content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col px-[6vw] pb-28 pt-[16vh] lg:px-[9vw] lg:pb-[14vh] lg:pt-[18vh]">
        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <p
            ref={eyebrowRef}
            className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold sm:text-[11px]"
          >
            <span className="mr-3 text-canvas/50">◆</span>
            JGLOW AESTHETIC CLINIC
          </p>
          <p className="hidden font-sans text-[10px] uppercase tracking-[0.32em] text-canvas/55 sm:block">
            Jakarta · Est. 2018
          </p>
        </div>

        {/* Main cinematic poster block */}
        <div className="mt-auto max-w-[1200px]">
          <h1
            ref={headingRef}
            className="font-display text-[clamp(52px,10vw,168px)] font-light leading-[0.9] text-canvas"
          >
            {headingLines.map((line, lineIndex) => (
              <span key={`line-${lineIndex}`} className="block italic">
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

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-gold" />
                <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">
                  Manifesto
                </span>
              </div>
              <p
                ref={subcopyRef}
                className="max-w-xl whitespace-pre-line font-sans text-[13px] font-light leading-[1.85] tracking-[0.06em] text-canvas/75 sm:text-[14px]"
              >
                {
                  "Perawatan estetika berbasis sains.\nDirancang untuk kulit Indonesia."
                }
              </p>
            </div>

            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-6 lg:col-span-6 lg:justify-end lg:gap-8"
            >
              <MagneticButton
                cursor="view"
                onClick={onBookingOpen}
                className="border border-canvas/80 bg-transparent px-9 py-4 font-sans text-[12px] uppercase tracking-[0.18em] text-canvas transition-colors duration-500 hover:bg-canvas hover:text-charcoal sm:px-10 sm:text-[13px]"
              >
                Reservasi Sekarang
              </MagneticButton>

              <a
                href="#treatments"
                className="font-sans text-[12px] tracking-[0.12em] text-canvas/70 underline underline-offset-[6px] decoration-gold/60 transition-colors duration-300 hover:text-gold sm:text-[13px]"
              >
                Lihat Layanan →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <div className="relative h-[60px] w-px overflow-hidden bg-canvas/30">
          <span
            ref={scrollPulseRef}
            className="absolute left-0 top-0 h-5 w-px bg-gold"
          />
        </div>
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-canvas/55">
          SCROLL
        </span>
      </div>
    </section>
  );
}
