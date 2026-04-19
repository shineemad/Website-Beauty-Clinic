"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import MagneticButton from "@/components/MagneticButton";

const socialLinks = ["Instagram", "TikTok", "WhatsApp"];

type FooterSectionProps = {
  onBookingOpen: () => void;
};

export default function FooterSection({ onBookingOpen }: FooterSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        heading,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="bg-charcoal px-[6vw] pb-[8vw] pt-[10vw] text-canvas lg:px-[8vw] lg:pb-[8vw] lg:pt-[12vw]"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
            SIAP UNTUK
          </p>
          <h2
            ref={headingRef}
            className="mt-6 font-display text-[clamp(58px,12vw,180px)] font-light italic leading-[0.88] text-canvas"
          >
            Ready to Glow?
          </h2>

          <div className="mt-16 flex justify-center">
            <MagneticButton
              cursor="view"
              variant="outline"
              onClick={onBookingOpen}
              className="border-gold px-14 py-5 text-[14px] tracking-[0.15em] text-gold hover:bg-gold hover:text-charcoal"
            >
              Booking Konsultasi
            </MagneticButton>
          </div>
        </div>

        <div className="my-16 h-[0.5px] bg-gold/30 lg:my-24" />

        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <p className="font-display text-[26px] font-light uppercase tracking-[0.3em] text-canvas sm:text-[28px]">
              JGLOW
            </p>
            <p className="mt-3 max-w-md font-sans text-[12px] tracking-[0.1em] text-canvas/40">
              Beauty Through Science. Confidence Through Care.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 text-center">
            {socialLinks.map((social) => (
              <a
                key={social}
                href="#"
                className="font-sans text-[12px] uppercase tracking-[0.15em] text-canvas/50 transition-colors duration-300 hover:text-gold"
              >
                {social}
              </a>
            ))}
          </div>

          <div className="text-center lg:text-right">
            <p className="font-sans text-[12px] leading-[2] text-canvas/40">
              Jl. Kemang Raya No. 8
              <br />
              Jakarta Selatan, 12730
              <br />
              hello@jglow.id
            </p>
          </div>
        </div>

        <p className="mt-12 text-center font-sans text-[11px] tracking-[0.1em] text-canvas/25">
          © 2025 JGLOW Aesthetic Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
