"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

import { DecorativeLine, FloatingShapes } from "@/components/SVGElements";
import { EASING, TIMING, STAGGER } from "@/lib/animations";

const philosophyText =
  "Kami percaya kecantikan sejati adalah tentang keseimbangan - antara sains modern dan kearifan alami. Setiap prosedur di JGLOW dirancang untuk menonjolkan versi terbaik dari diri Anda, bukan mengubahnya.";

const trustBadges = [
  { label: "BPOM Certified", value: "BPOM Certified" },
  { label: "Dokter Tersertifikasi", value: "Dokter Tersertifikasi" },
  { label: "5.000+ Pasien Puas", value: "5.000+ Pasien Puas" },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const paragraph = paragraphRef.current;

    if (!section || !paragraph) {
      return undefined;
    }

    const split = new SplitType(paragraph, {
      types: "words",
    });

    const words = paragraph.querySelectorAll<HTMLElement>(".word");

    gsap.set(words, {
      color: "#C8C3BC",
    });

    const context = gsap.context(() => {
      gsap.to(words, {
        color: "#1A1A1A",
        stagger: STAGGER.STANDARD,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
          end: "bottom 35%",
          scrub: 1.5,
        },
      });
    }, section);

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-canvas px-[6vw] pb-[8vw] pt-[8vw] lg:px-[8vw] lg:pb-[8vw] lg:pt-[10vw] relative"
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-20 left-0 w-96 h-96 opacity-20">
          <FloatingShapes />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_0.8fr] relative z-10">
        <div>
          <p className="mb-8 font-sans text-[11px] uppercase tracking-[0.25em] text-gold">
            FILOSOFI KAMI
          </p>

          {/* Decorative line */}
          <div className="mb-8 w-12 h-0.5 bg-gradient-to-r from-gold to-transparent" />

          <p
            ref={paragraphRef}
            className="font-display text-[clamp(32px,3.5vw,52px)] font-light leading-[1.3] text-charcoal"
          >
            {philosophyText}
          </p>
        </div>

        <aside className="lg:sticky lg:top-[30vh] lg:h-fit">
          <div className="space-y-0">
            {trustBadges.map((badge) => (
              <div key={badge.value} className="py-8 first:pt-0">
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
                  {badge.label}
                </p>
                <p className="mt-3 font-display text-[28px] font-light text-charcoal">
                  {badge.value}
                </p>
                <div className="mt-8 h-[0.5px] bg-gold" />
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-16 h-[0.5px] w-full bg-gold" />
    </section>
  );
}
