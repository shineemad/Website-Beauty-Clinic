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
  image: string;
};

const products: ProductItem[] = [
  {
    name: "Luminous Serum C20",
    subtitle: "Vitamin C Brightening",
    price: "Rp 485.000",
    tone: "#F0EAE4",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=700&q=80&auto=format&fit=crop",
  },
  {
    name: "Barrier Repair Cream",
    subtitle: "Ceramide Restoration",
    price: "Rp 520.000",
    tone: "#E8E0DA",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=700&q=80&auto=format&fit=crop",
  },
  {
    name: "Retinal Night Elixir",
    subtitle: "Advanced Renewal",
    price: "Rp 695.000",
    tone: "#F5F0EC",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80&auto=format&fit=crop",
  },
  {
    name: "Solar Guard SPF50+",
    subtitle: "Daily UV Defense",
    price: "Rp 320.000",
    tone: "#EDE7E1",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80&auto=format&fit=crop",
  },
  {
    name: "Hydra Peptide Mist",
    subtitle: "Deep Hydration",
    price: "Rp 280.000",
    tone: "#F2EDE8",
    image:
      "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=700&q=80&auto=format&fit=crop",
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
                className="relative h-[65%] overflow-hidden"
                style={{ backgroundColor: product.tone }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute left-5 top-5 font-sans text-[9px] uppercase tracking-[0.22em] text-canvas mix-blend-difference">
                  Premium
                </span>
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
