"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { GoldenOrb } from "@/components/SVGElements";
import { EASING, TIMING } from "@/lib/animations";

type ProductItem = {
  name: string;
  subtitle: string;
  price: string;
  tone: string;
};

const products: ProductItem[] = [
  {
    name: "Luminous Serum C20",
    subtitle: "Vitamin C Brightening",
    price: "Rp 485.000",
    tone: "#F0EAE4",
  },
  {
    name: "Barrier Repair Cream",
    subtitle: "Ceramide Restoration",
    price: "Rp 520.000",
    tone: "#E8E0DA",
  },
  {
    name: "Retinal Night Elixir",
    subtitle: "Advanced Renewal",
    price: "Rp 695.000",
    tone: "#F5F0EC",
  },
  {
    name: "Solar Guard SPF50+",
    subtitle: "Daily UV Defense",
    price: "Rp 320.000",
    tone: "#EDE7E1",
  },
  {
    name: "Hydra Peptide Mist",
    subtitle: "Deep Hydration",
    price: "Rp 280.000",
    tone: "#F2EDE8",
  },
];

export default function Products() {
  const railViewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const scrollLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const viewport = railViewportRef.current;
    const rail = railRef.current;
    const scrollLabel = scrollLabelRef.current;

    if (!viewport || !rail || !scrollLabel) {
      return undefined;
    }

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const distance = () =>
          Math.max(0, rail.scrollWidth - viewport.clientWidth);

        gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(scrollLabel, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: "+=140",
            scrub: true,
          },
        });
      });

      return () => {
        mm.revert();
      };
    }, viewport);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section className="relative bg-rose py-[8vw]">
      <div className="px-[6vw] text-center lg:px-[8vw]">
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#8A6E5E]">
          THE ELIXIRS
        </p>
        <h2 className="mb-14 mt-8 whitespace-pre-line font-display text-[clamp(42px,7vw,100px)] font-light italic leading-[0.9] text-charcoal lg:mb-20">
          {"Skincare\nBerbasis Sains"}
        </h2>
      </div>

      <div
        ref={railViewportRef}
        data-cursor="drag"
        className="relative h-auto overflow-x-auto px-[6vw] pb-4 lg:h-[520px] lg:overflow-hidden lg:px-0 lg:pl-[8vw]"
      >
        <div
          ref={railRef}
          className="flex h-full w-max items-center gap-[4vw] pr-[6vw] lg:gap-0 lg:pr-[8vw]"
        >
          {products.map((product) => (
            <article
              key={product.name}
              className="h-[380px] w-[250px] shrink-0 rounded-[2px] bg-canvas lg:mr-[3vw] lg:h-[400px] lg:w-[260px] lg:last:mr-0"
            >
              <div
                className="h-[65%] px-6"
                style={{ backgroundColor: product.tone }}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="relative w-24 h-24">
                    <GoldenOrb className="drop-shadow-lg" />
                  </div>
                  <span className="mt-6 font-sans text-[10px] uppercase tracking-[0.12em] text-[#C0B8B0]">
                    PREMIUM FORMULA
                  </span>
                </div>
              </div>

              <div className="flex h-[35%] flex-col px-6 py-6">
                <h3 className="font-display text-[22px] font-normal leading-[1.2] text-charcoal">
                  {product.name}
                </h3>
                <p className="mt-1.5 font-sans text-[11px] tracking-[0.1em] text-muted">
                  {product.subtitle}
                </p>
                <p className="mt-3 font-sans text-[13px] text-gold">
                  {product.price}
                </p>
                <a
                  href="#"
                  className="relative mt-4 inline-block w-fit font-sans text-[11px] uppercase tracking-[0.15em] text-charcoal after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-charcoal after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Add to Cart
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <span
        ref={scrollLabelRef}
        className="pointer-events-none absolute right-[4vw] top-1/2 hidden origin-center -translate-y-1/2 rotate-90 font-sans text-[11px] uppercase tracking-[0.25em] text-[#8A6E5E] lg:block"
      >
        SCROLL →
      </span>
    </section>
  );
}
