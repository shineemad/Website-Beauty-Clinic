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
  image: string;
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
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1100&q=80&auto=format&fit=crop",
  },
  {
    id: "B",
    label: "ARTIS / INFLUENCER 2",
    name: "Selena Adjani",
    role: "Actor & Public Figure",
    tone: "#D4C9BE",
    area: "B",
    heightClass: "min-h-[300px] lg:min-h-[320px]",
    image:
      "https://images.unsplash.com/photo-1529421308418-eab98863cee4?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "C",
    label: "ARTIS / INFLUENCER 3",
    name: "Naura Dimas",
    role: "Content Creator",
    tone: "#E0D5CC",
    area: "C",
    heightClass: "min-h-[280px] lg:min-h-[320px]",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "D",
    label: "ARTIS / INFLUENCER 4",
    name: "Mila Rakasiwi",
    role: "Creative Entrepreneur",
    tone: "#C8BFB5",
    area: "D",
    heightClass: "min-h-[280px] lg:min-h-[320px]",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=900&q=80&auto=format&fit=crop",
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

  const [featuredCard, ...supportingCards] = trustCards;

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas px-[6vw] pb-[10vw] pt-[10vw] lg:px-[8vw] lg:pb-[12vw] lg:pt-[12vw]"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section intro — editorial header */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-gold">
              <span className="mr-3 text-charcoal/35">III</span>
              DIPERCAYA OLEH
            </p>
            <h2 className="mt-8 whitespace-pre-line font-display text-[clamp(44px,6.8vw,104px)] font-light leading-[0.92] text-charcoal">
              {"Ribuan Wajah,\nSatu Kepercayaan."}
            </h2>
          </div>
          <div className="col-span-12 flex flex-col justify-end lg:col-span-5">
            <div className="h-px w-full bg-charcoal/10" />
            <p className="mt-6 max-w-[440px] font-sans text-[13px] leading-[1.85] tracking-[0.04em] text-muted lg:ml-auto">
              Dari panggung layar hingga ruang kreatif — setiap wajah yang
              memilih JGLOW menjadi bagian dari cerita perawatan yang personal
              dan terukur.
            </p>
          </div>
        </div>

        {/* Editorial portraits grid */}
        <div className="mt-16 grid grid-cols-12 gap-5 lg:mt-24 lg:gap-6">
          <article
            data-trust-card
            className="relative col-span-12 overflow-hidden rounded-[4px] bg-charcoal/5 lg:col-span-7 lg:row-span-2"
          >
            <div
              data-trust-media
              className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-[720px]"
              style={{ backgroundColor: featuredCard.tone }}
            >
              <img
                src={featuredCard.image}
                alt={featuredCard.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute left-6 top-6 flex items-center gap-3">
                <span className="inline-block h-[5px] w-[5px] rounded-full bg-gold" />
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
                  Featured · 2026
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 lg:p-8">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-canvas/70">
                    {featuredCard.label}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(28px,3vw,44px)] font-light italic leading-[1.05] text-canvas">
                    {featuredCard.name}
                  </h3>
                  <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-canvas/70">
                    {featuredCard.role}
                  </p>
                </div>
                <span className="hidden font-display text-[56px] font-light leading-none text-canvas/80 sm:block">
                  01
                </span>
              </div>
            </div>
          </article>

          {supportingCards.map((card, index) => (
            <article
              key={card.id}
              data-trust-card
              className="relative col-span-12 overflow-hidden rounded-[4px] bg-charcoal/5 sm:col-span-6 lg:col-span-5"
            >
              <div
                data-trust-media
                className="relative aspect-[4/3] w-full lg:h-[348px]"
                style={{ backgroundColor: card.tone }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 lg:p-6">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-canvas/70">
                      {card.label}
                    </p>
                    <h3 className="mt-2 font-display text-[22px] font-light italic leading-[1.05] text-canvas">
                      {card.name}
                    </h3>
                    <p className="mt-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-canvas/65">
                      {card.role}
                    </p>
                  </div>
                  <span className="font-display text-[34px] font-light leading-none text-canvas/70">
                    0{index + 2}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pull quote — editorial moment */}
        <figure className="mx-auto mt-24 grid max-w-[1100px] grid-cols-12 gap-6 lg:mt-32">
          <div className="col-span-12 flex items-start justify-center lg:col-span-1 lg:justify-end">
            <span className="block font-display text-[80px] leading-[0.6] text-gold lg:text-[96px]">
              “
            </span>
          </div>
          <blockquote className="col-span-12 lg:col-span-10">
            <p className="font-display text-[clamp(26px,3vw,44px)] font-light italic leading-[1.38] text-charcoal">
              Pertama kalinya saya merasa nyaman dan percaya diri dengan kulit
              saya. JGLOW bukan sekadar klinik — ini sanctuary.
            </p>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-muted">
                Raisa A. · Member sejak 2021
              </span>
            </figcaption>
          </blockquote>
          <div className="col-span-12 lg:col-span-1" />
        </figure>

        {/* Reviews — editorial columns with hairlines */}
        <div
          data-reviews-wrap
          className="mt-24 border-t border-charcoal/10 pt-12 lg:mt-32 lg:pt-16"
        >
          <div className="grid grid-cols-12 gap-6 lg:gap-10">
            <div className="col-span-12 lg:col-span-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-gold">
                <span className="mr-3 text-charcoal/35">IV</span>
                REVIEW PELANGGAN
              </p>
              <h3 className="mt-6 font-display text-[clamp(32px,4.2vw,64px)] font-light leading-[0.96] text-charcoal">
                Suara Mereka
                <br />
                Tentang JGLOW
              </h3>
              <p className="mt-6 max-w-[360px] font-sans text-[12.5px] leading-[1.85] tracking-[0.04em] text-muted">
                Tiga cerita singkat dari perjalanan perawatan yang personal,
                ditulis apa adanya.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <ul className="flex flex-col">
                {customerReviews.map((review, idx) => (
                  <li
                    key={review.id}
                    data-review-card
                    className="group grid grid-cols-12 gap-4 border-t border-charcoal/10 py-8 first:border-t-0 first:pt-0 lg:gap-6 lg:py-10"
                  >
                    <div className="col-span-12 flex items-center justify-between lg:col-span-2 lg:flex-col lg:items-start lg:justify-start lg:gap-6">
                      <span className="font-display text-[28px] font-light leading-none text-charcoal/30 lg:text-[34px]">
                        0{idx + 1}
                      </span>
                      <span
                        className="font-sans text-[12px] tracking-[0.14em] text-gold"
                        aria-label={`Rating ${review.rating} dari 5`}
                      >
                        {"★".repeat(review.rating)}
                      </span>
                    </div>

                    <div className="col-span-12 lg:col-span-10">
                      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-gold/90">
                        {review.treatment}
                      </p>
                      <p className="mt-4 font-display text-[clamp(18px,1.6vw,22px)] font-light leading-[1.55] text-charcoal">
                        “{review.text}”
                      </p>
                      <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                        — {review.name}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Cities — editorial strip */}
        <div className="mt-24 border-t border-charcoal/10 pt-10 lg:mt-32 lg:pt-14">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-charcoal/10" />
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-muted">
              Tersedia di
            </span>
            <span className="h-px flex-1 bg-charcoal/10" />
          </div>
          <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-3 sm:gap-x-8">
            {cities.map((city, index) => (
              <div key={city} className="flex items-baseline gap-5 sm:gap-8">
                <a
                  href="#"
                  className="font-display text-[clamp(24px,3.4vw,34px)] font-light italic text-[#C8C3BC] transition-colors duration-500 hover:text-charcoal"
                >
                  {city}
                </a>
                {index < cities.length - 1 ? (
                  <span className="font-display text-[18px] text-gold/80">
                    ·
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
