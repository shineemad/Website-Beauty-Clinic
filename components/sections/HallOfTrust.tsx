"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { EASING, STAGGER, TIMING } from "@/lib/animations";

type TrustCard = {
  id: "A" | "B" | "C" | "D";
  label: string;
  name: string;
  role: string;
  tone: string;
  area: string;
  heightClass: string;
};

type CustomerReview = {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  text: string;
};

const trustCards: TrustCard[] = [
  {
    id: "A",
    label: "ARTIS / INFLUENCER 1",
    name: "Amara Putri",
    role: "Artist & Beauty Director",
    tone: "#DDBEBB",
    area: "A",
    heightClass: "min-h-[560px] lg:min-h-[660px]",
  },
  {
    id: "B",
    label: "ARTIS / INFLUENCER 2",
    name: "Selena Adjani",
    role: "Actor & Public Figure",
    tone: "#D4C9BE",
    area: "B",
    heightClass: "min-h-[300px] lg:min-h-[320px]",
  },
  {
    id: "C",
    label: "ARTIS / INFLUENCER 3",
    name: "Naura Dimas",
    role: "Content Creator",
    tone: "#E0D5CC",
    area: "C",
    heightClass: "min-h-[280px] lg:min-h-[320px]",
  },
  {
    id: "D",
    label: "ARTIS / INFLUENCER 4",
    name: "Mila Rakasiwi",
    role: "Creative Entrepreneur",
    tone: "#C8BFB5",
    area: "D",
    heightClass: "min-h-[280px] lg:min-h-[320px]",
  },
];

const cities = [
  "Jakarta Selatan",
  "Bandung",
  "Surabaya",
  "Bali",
  "Medan",
  "Yogyakarta",
];

const customerReviews: CustomerReview[] = [
  {
    id: "R1",
    name: "Nabila R.",
    treatment: "Extra Glow Laser",
    rating: 5,
    text: "Dokternya sangat detail menjelaskan prosedur. Kulit saya jauh lebih cerah dan teksturnya lebih halus dalam 3 sesi.",
  },
  {
    id: "R2",
    name: "Intan P.",
    treatment: "Instant Bright Gold",
    rating: 5,
    text: "Hasilnya langsung kelihatan setelah treatment. Pelayanan ramah, tempatnya tenang, dan follow-up aftercare sangat membantu.",
  },
  {
    id: "R3",
    name: "Claudia M.",
    treatment: "DNA Salmon Injection",
    rating: 5,
    text: "Awalnya ragu, tapi hasilnya natural banget. Kulit tampak sehat tanpa terlihat berlebihan. Recommended untuk first timer.",
  },
];

export default function HallOfTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      const mediaItems = gsap.utils.toArray<HTMLElement>("[data-trust-media]");
      const trustCardsElements =
        gsap.utils.toArray<HTMLElement>("[data-trust-card]");
      const reviewCards = gsap.utils.toArray<HTMLElement>("[data-review-card]");

      mediaItems.forEach((item) => {
        gsap.fromTo(
          item,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        trustCardsElements,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: TIMING.MEDIUM,
          ease: EASING.ENTRANCE,
          stagger: STAGGER.STANDARD,
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
          },
        },
      );

      gsap.fromTo(
        reviewCards,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: TIMING.SHORT,
          ease: EASING.SMOOTH,
          stagger: STAGGER.STANDARD,
          scrollTrigger: {
            trigger: "[data-reviews-wrap]",
            start: "top 75%",
          },
        },
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-canvas px-[6vw] pb-[8vw] pt-[8vw] lg:px-[8vw] lg:pb-[8vw] lg:pt-[10vw]"
    >
      <div className="mx-auto max-w-[1500px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">
          DIPERCAYA OLEH
        </p>
        <h2 className="mb-16 mt-8 whitespace-pre-line font-display text-[clamp(40px,6.5vw,96px)] font-light leading-[0.92] text-charcoal lg:mb-24">
          {"Ribuan Wajah,\nSatu Kepercayaan."}
        </h2>

        <div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          style={{
            gridTemplateAreas: '"A" "B" "C" "D"',
          }}
        >
          {trustCards.map((card) => (
            <article
              key={card.id}
              data-trust-card
              className={`relative overflow-hidden rounded-[6px] border border-charcoal/5 shadow-[0_10px_30px_rgba(26,26,26,0.06)] ${card.heightClass}`}
              style={{
                gridArea: card.area,
              }}
            >
              <div
                data-trust-media
                className="absolute inset-x-0 -top-[5%] h-[110%]"
                style={{ backgroundColor: card.tone }}
              >
                <div className="flex h-full w-full items-start justify-end p-6">
                  <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-charcoal/40">
                    {card.label}
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-[22px] italic text-canvas sm:text-[24px]">
                  {card.name}
                </h3>
                <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.12em] text-canvas/70">
                  {card.role}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-[760px] text-center">
          <p className="font-display text-[120px] leading-[0] text-gold">“</p>
          <p className="mt-8 font-display text-[clamp(28px,3vw,46px)] font-light italic leading-[1.35] text-charcoal">
            Pertama kalinya saya merasa nyaman dan percaya diri dengan kulit
            saya. JGLOW bukan sekadar klinik - ini sanctuary.
          </p>
          <p className="mt-8 font-sans text-[12px] tracking-[0.15em] text-muted">
            — Raisa A., Member sejak 2021
          </p>
        </div>

        <div className="divider-gradient my-14 lg:my-16" />

        <div data-reviews-wrap>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">
                REVIEW PELANGGAN
              </p>
              <h3 className="mt-4 font-display text-[clamp(30px,4.5vw,58px)] font-light leading-[0.96] text-charcoal">
                Suara Mereka Tentang JGLOW
              </h3>
            </div>
            <p className="max-w-[420px] font-sans text-[12px] leading-[1.8] tracking-[0.05em] text-muted">
              Pengalaman nyata dari pelanggan yang menjalani perawatan personal
              bersama tim dokter JGLOW.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {customerReviews.map((review) => (
              <article
                key={review.id}
                data-review-card
                className="rounded-[6px] border border-charcoal/10 bg-canvas p-6 shadow-[0_8px_28px_rgba(26,26,26,0.06)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-gold">
                    {review.treatment}
                  </span>
                  <span
                    className="font-sans text-[12px] text-charcoal/75"
                    aria-label={`Rating ${review.rating} dari 5`}
                  >
                    {"★".repeat(review.rating)}
                  </span>
                </div>
                <p className="font-sans text-[13px] leading-[1.75] text-charcoal/75">
                  {review.text}
                </p>
                <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
                  — {review.name}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-5">
          {cities.map((city, index) => (
            <div key={city} className="flex items-center gap-4 sm:gap-5">
              <a
                href="#"
                className="font-display text-[clamp(24px,3.5vw,32px)] font-light text-[#C8C3BC] transition-colors duration-300 hover:text-charcoal"
              >
                {city}
              </a>
              {index < cities.length - 1 ? (
                <span className="font-display text-[24px] text-gold">·</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          section > div > .grid {
            grid-template-areas:
              "A B B"
              "A C D";
          }
        }
      `}</style>
    </section>
  );
}
