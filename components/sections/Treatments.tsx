"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

type TreatmentRow = {
  number: string;
  name: string;
  category: string;
  tone: string;
  image: string;
};

const treatments: TreatmentRow[] = [
  {
    number: "01",
    name: "Signature Facial Glow",
    category: "Facial Care",
    tone: "#DDBEBB",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop",
  },
  {
    number: "02",
    name: "Laser Brightening",
    category: "Laser Treatment",
    tone: "#E8DED5",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80&auto=format&fit=crop",
  },
  {
    number: "03",
    name: "Filler & Contouring",
    category: "Aesthetic Medicine",
    tone: "#D4C9BE",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&auto=format&fit=crop",
  },
  {
    number: "04",
    name: "PRP Rejuvenation",
    category: "Regenerative Care",
    tone: "#C8BFB5",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80&auto=format&fit=crop",
  },
  {
    number: "05",
    name: "Body Sculpting",
    category: "Body Treatment",
    tone: "#E0D5CC",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format&fit=crop",
  },
  {
    number: "06",
    name: "Medical Skincare",
    category: "Skincare Prescription",
    tone: "#D8CECA",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80&auto=format&fit=crop",
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

    // Set initial resting state for all rows (indented 16px),
    // so first hover does not jump from an undefined transform.
    gsap.set("[data-row-content]", { x: 16 });
    gsap.set("[data-row-arrow]", { x: 0 });
    gsap.set("[data-row-category]", { opacity: 0.7 });

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
    const img = preview.querySelector<HTMLImageElement>("[data-preview-img]");
    if (img && !img.src.includes(treatment.image)) {
      img.src = treatment.image;
      img.alt = treatment.name;
    }
    const label = preview.querySelector<HTMLElement>("[data-preview-label]");
    if (label) {
      label.textContent = treatment.name;
    }
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
    const heading = row.querySelector<HTMLElement>("[data-row-heading]");
    const category = row.querySelector<HTMLElement>("[data-row-category]");
    const arrow = row.querySelector<HTMLElement>("[data-row-arrow]");
    const divider = row.querySelector<HTMLElement>("[data-row-divider]");

    if (content) {
      gsap.to(content, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (number) {
      gsap.to(number, {
        color: "#D5B97D",
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (heading) {
      gsap.to(heading, {
        color: "#D5B97D",
        duration: 0.45,
        ease: "power2.out",
      });
    }

    if (category) {
      gsap.to(category, {
        opacity: 1,
        color: "#1A1A1A",
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 10,
        duration: 0.45,
        ease: "power3.out",
      });
    }

    if (divider) {
      gsap.to(divider, {
        backgroundColor: "#D5B97D",
        opacity: 0.6,
        duration: 0.4,
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
    const heading = row.querySelector<HTMLElement>("[data-row-heading]");
    const category = row.querySelector<HTMLElement>("[data-row-category]");
    const arrow = row.querySelector<HTMLElement>("[data-row-arrow]");
    const divider = row.querySelector<HTMLElement>("[data-row-divider]");

    if (content) {
      gsap.to(content, {
        x: 16,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (number) {
      gsap.to(number, {
        color: "#8A8279",
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (heading) {
      gsap.to(heading, {
        color: "#1A1A1A",
        duration: 0.45,
        ease: "power2.out",
      });
    }

    if (category) {
      gsap.to(category, {
        opacity: 0.7,
        color: "#8A8279",
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        duration: 0.45,
        ease: "power3.out",
      });
    }

    if (divider) {
      gsap.to(divider, {
        backgroundColor: "#E8E4DF",
        opacity: 1,
        duration: 0.4,
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
            <div data-row-divider className="h-[0.5px] w-full bg-[#E8E4DF]" />

            <div
              data-cursor="view"
              onMouseEnter={(event) => handleRowEnter(event, treatment)}
              onMouseMove={movePreview}
              onMouseLeave={handleRowLeave}
              className="group cursor-pointer"
            >
              <div
                data-row-content
                className="flex items-center justify-between gap-8 py-10 will-change-transform"
              >
                <div className="flex min-w-0 items-center gap-6 lg:gap-10">
                  <span
                    data-row-number
                    className="font-sans text-[11px] tracking-[0.12em] text-[#8A8279]"
                  >
                    {treatment.number}
                  </span>

                  <h3
                    data-row-heading
                    className="font-display text-[clamp(36px,4vw,64px)] font-light leading-[0.95] text-charcoal"
                  >
                    {treatment.name}
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-7 lg:gap-10">
                  <span
                    data-row-category
                    className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#8A8279]"
                  >
                    {treatment.category}
                  </span>
                  <span
                    data-row-arrow
                    className="inline-block font-display text-[20px] leading-none text-gold will-change-transform"
                  >
                    →
                  </span>
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
        <img
          data-preview-img
          src=""
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end p-5">
          <span
            data-preview-label
            className="font-sans text-[10px] uppercase tracking-[0.18em] text-canvas"
          >
            Hover Preview
          </span>
        </div>
      </div>
    </section>
  );
}
