"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

type TreatmentRow = {
  number: string;
  name: string;
  category: string;
  tone: string;
};

const treatments: TreatmentRow[] = [
  {
    number: "01",
    name: "Signature Facial Glow",
    category: "Facial Care",
    tone: "#DDBEBB",
  },
  {
    number: "02",
    name: "Laser Brightening",
    category: "Laser Treatment",
    tone: "#E8DED5",
  },
  {
    number: "03",
    name: "Filler & Contouring",
    category: "Aesthetic Medicine",
    tone: "#D4C9BE",
  },
  {
    number: "04",
    name: "PRP Rejuvenation",
    category: "Regenerative Care",
    tone: "#C8BFB5",
  },
  {
    number: "05",
    name: "Body Sculpting",
    category: "Body Treatment",
    tone: "#E0D5CC",
  },
  {
    number: "06",
    name: "Medical Skincare",
    category: "Skincare Prescription",
    tone: "#D8CECA",
  },
];

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

export default function Treatments() {
  const previewRef = useRef<HTMLDivElement>(null);
  const canHoverRef = useRef(false);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const preview = previewRef.current;

    if (!preview) {
      return undefined;
    }

    canHoverRef.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    gsap.set(preview, {
      opacity: 0,
      scale: 0.85,
      x: -999,
      y: -999,
    });

    const follow = () => {
      currentXRef.current = lerp(currentXRef.current, targetXRef.current, 0.08);
      currentYRef.current = lerp(currentYRef.current, targetYRef.current, 0.08);

      gsap.set(preview, {
        x: currentXRef.current,
        y: currentYRef.current,
      });
    };

    gsap.ticker.add(follow);

    return () => {
      gsap.ticker.remove(follow);
    };
  }, []);

  const showPreview = (
    event: React.MouseEvent<HTMLDivElement>,
    treatment: TreatmentRow,
  ) => {
    if (!canHoverRef.current || !previewRef.current) {
      return;
    }

    const preview = previewRef.current;
    targetXRef.current = event.clientX + 20;
    targetYRef.current = event.clientY - 200;

    if (!isVisibleRef.current) {
      currentXRef.current = targetXRef.current;
      currentYRef.current = targetYRef.current;
    }

    preview.style.backgroundColor = treatment.tone;
    preview.setAttribute("data-treatment", treatment.name);
    isVisibleRef.current = true;

    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const movePreview = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canHoverRef.current) {
      return;
    }

    targetXRef.current = event.clientX + 20;
    targetYRef.current = event.clientY - 200;
  };

  const hidePreview = () => {
    if (!canHoverRef.current || !previewRef.current) {
      return;
    }

    isVisibleRef.current = false;

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleRowEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    treatment: TreatmentRow,
  ) => {
    if (!canHoverRef.current) {
      return;
    }

    const row = event.currentTarget;
    const content = row.querySelector<HTMLElement>("[data-row-content]");
    const number = row.querySelector<HTMLElement>("[data-row-number]");

    if (content) {
      gsap.to(content, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (number) {
      gsap.to(number, {
        color: "#D5B97D",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    showPreview(event, treatment);
  };

  const handleRowLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canHoverRef.current) {
      return;
    }

    const row = event.currentTarget;
    const content = row.querySelector<HTMLElement>("[data-row-content]");
    const number = row.querySelector<HTMLElement>("[data-row-number]");

    if (content) {
      gsap.to(content, {
        x: 16,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (number) {
      gsap.to(number, {
        color: "#8A8279",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    hidePreview();
  };

  return (
    <section
      id="treatments"
      className="relative bg-canvas px-[8vw] pb-[8vw] pt-[12vw]"
    >
      <div className="w-full">
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">
          LAYANAN PILIHAN
        </p>
        <h2 className="mb-24 mt-8 whitespace-pre-line font-display text-[clamp(52px,6vw,96px)] font-light leading-[0.95] text-charcoal">
          {"Perawatan\nyang Kami Tawarkan"}
        </h2>

        {treatments.map((treatment) => (
          <div key={treatment.number} className="relative">
            <div className="h-[0.5px] w-full bg-[#E8E4DF]" />

            <div
              data-cursor="view"
              onMouseEnter={(event) => handleRowEnter(event, treatment)}
              onMouseMove={movePreview}
              onMouseLeave={handleRowLeave}
              className="group"
            >
              <div
                data-row-content
                className="flex translate-x-4 items-center justify-between gap-8 py-10"
              >
                <div className="flex min-w-0 items-center gap-6 lg:gap-10">
                  <span
                    data-row-number
                    className="font-sans text-[11px] tracking-[0.12em] text-[#8A8279]"
                  >
                    {treatment.number}
                  </span>

                  <h3 className="font-display text-[clamp(36px,4vw,64px)] font-light leading-[0.95] text-charcoal">
                    {treatment.name}
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-7 lg:gap-10">
                  <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#8A8279]">
                    {treatment.category}
                  </span>
                  <span className="font-display text-[20px] leading-none text-gold">→</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="h-[0.5px] w-full bg-[#E8E4DF]" />

        <div className="mt-12 flex justify-end">
          <a
            href="#"
            className="font-sans text-[13px] tracking-[0.1em] text-[#8A8279] transition-colors duration-300 hover:text-charcoal"
          >
            Lihat Semua Layanan →
          </a>
        </div>
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-[400px] w-[320px] overflow-hidden rounded-[4px] lg:block"
      >
        <div className="flex h-full w-full items-end p-5">
          <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-charcoal/45">
            Hover Preview
          </span>
        </div>
      </div>
    </section>
  );
}
