"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import MagneticButton from "@/components/MagneticButton";

type BookingOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

type BookingFormState = {
  name: string;
  whatsapp: string;
  service: string;
  date: string;
  notes: string;
};

const initialFormState: BookingFormState = {
  name: "",
  whatsapp: "",
  service: "",
  date: "",
  notes: "",
};

const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23D5B97D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")";

export default function BookingOverlay({
  isOpen,
  onClose,
}: BookingOverlayProps) {
  const [formState, setFormState] =
    useState<BookingFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const successWrapRef = useRef<HTMLDivElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const topCurtain = topCurtainRef.current;
    const bottomCurtain = bottomCurtainRef.current;
    const content = contentRef.current;

    if (!topCurtain || !bottomCurtain || !content) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    gsap.set(topCurtain, { yPercent: -100 });
    gsap.set(bottomCurtain, { yPercent: 100 });
    gsap.set(content, { opacity: 0, y: 24 });

    const intro = gsap.timeline();

    intro
      .to(
        topCurtain,
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power4.inOut",
        },
        0,
      )
      .to(
        bottomCurtain,
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power4.inOut",
        },
        0,
      )
      .to(
        topCurtain,
        {
          yPercent: -100,
          duration: 0.38,
          ease: "power4.inOut",
        },
        0.62,
      )
      .to(
        bottomCurtain,
        {
          yPercent: 100,
          duration: 0.38,
          ease: "power4.inOut",
        },
        0.62,
      )
      .to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0.74,
      );

    return () => {
      intro.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (
      !isSubmitted ||
      !successWrapRef.current ||
      !checkPathRef.current ||
      !formWrapRef.current
    ) {
      return undefined;
    }

    const path = checkPathRef.current;
    const formWrap = formWrapRef.current;
    const successWrap = successWrapRef.current;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    gsap.to(formWrap, {
      opacity: 0,
      y: -18,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(successWrap, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    const autoCloseTimer = window.setTimeout(() => {
      handleClose();
    }, 4000);

    return () => {
      window.clearTimeout(autoCloseTimer);
    };
  }, [isSubmitted]);

  useEffect(() => {
    const closeEl = closeRef.current;

    if (!isOpen || !closeEl) {
      return undefined;
    }

    const onMove = (event: MouseEvent) => {
      const rect = closeEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (event.clientX - centerX) * 0.2;
      const deltaY = (event.clientY - centerY) * 0.2;

      gsap.to(closeEl, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(closeEl, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    closeEl.addEventListener("mousemove", onMove);
    closeEl.addEventListener("mouseleave", onLeave);

    return () => {
      closeEl.removeEventListener("mousemove", onMove);
      closeEl.removeEventListener("mouseleave", onLeave);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsSubmitting(false);
    setIsSubmitted(false);
    setFormState(initialFormState);
    onClose();
  };

  const handleInputChange =
    (field: keyof BookingFormState) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || isSubmitted) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9000] overflow-y-auto"
      style={{ backgroundColor: "rgba(26, 26, 26, 0.97)" }}
      data-cursor="default"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      aria-describedby="booking-description"
    >
      <div
        ref={topCurtainRef}
        className="pointer-events-none absolute left-0 top-0 h-1/2 w-full bg-charcoal"
      />
      <div
        ref={bottomCurtainRef}
        className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-charcoal"
      />

      <div
        ref={contentRef}
        className="relative mx-auto w-full max-w-[600px] px-6 pb-16 pt-[10vh] sm:px-10 lg:px-0"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={handleClose}
          data-cursor="view"
          className="absolute right-0 top-4 font-sans text-[11px] uppercase tracking-[0.2em] text-canvas/50 transition-colors duration-300 hover:text-gold sm:top-12 sm:text-[12px]"
          aria-label="Close booking dialog"
        >
          ✕ CLOSE
        </button>

        <h3
          className="mb-12 whitespace-pre-line text-center font-display text-[clamp(42px,6vw,80px)] font-light italic leading-[0.9] text-canvas"
          id="booking-title"
        >
          {"Mulai Perjalanan\nAnda."}
        </h3>

        <p
          className="mb-14 text-center font-sans text-[12px] tracking-[0.08em] text-canvas/50 sm:mb-16 sm:text-[13px]"
          id="booking-description"
        >
          Pilih layanan dan waktu yang tepat untuk Anda.
        </p>

        <div
          ref={formWrapRef}
          style={{ display: isSubmitted ? "none" : "block" }}
        >
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <input
              type="text"
              value={formState.name}
              onChange={handleInputChange("name")}
              placeholder="Nama Lengkap"
              aria-label="Full name"
              className="w-full border-0 border-b border-gold/20 bg-transparent py-4 font-sans text-[13px] tracking-[0.05em] text-canvas outline-none transition-all duration-300 placeholder:text-canvas/20 focus:border-b-2 focus:border-gold focus:bg-gradient-to-b focus:from-gold/5 focus:to-transparent"
              required
            />

            <input
              type="tel"
              value={formState.whatsapp}
              onChange={handleInputChange("whatsapp")}
              placeholder="Nomor WhatsApp"
              aria-label="WhatsApp number"
              className="w-full border-0 border-b border-gold/20 bg-transparent py-4 font-sans text-[13px] tracking-[0.05em] text-canvas outline-none transition-all duration-300 placeholder:text-canvas/20 focus:border-b-2 focus:border-gold focus:bg-gradient-to-b focus:from-gold/5 focus:to-transparent"
              required
            />

            <select
              value={formState.service}
              onChange={handleInputChange("service")}
              aria-label="Select service"
              className="w-full appearance-none border-0 border-b border-gold/20 bg-transparent bg-no-repeat py-4 pr-10 font-sans text-[13px] tracking-[0.05em] text-canvas outline-none transition-all duration-300 focus:border-b-2 focus:border-gold focus:bg-gradient-to-b focus:from-gold/5 focus:to-transparent"
              style={{
                backgroundImage: selectChevron,
                backgroundPosition: "right 0.15rem center",
                backgroundSize: "16px 16px",
              }}
              required
            >
              <option value="" className="text-charcoal">
                Pilih Layanan
              </option>
              <option value="Signature Facial Glow" className="text-charcoal">
                Signature Facial Glow
              </option>
              <option value="Laser Brightening" className="text-charcoal">
                Laser Brightening
              </option>
              <option value="Filler & Contouring" className="text-charcoal">
                Filler & Contouring
              </option>
              <option value="PRP Rejuvenation" className="text-charcoal">
                PRP Rejuvenation
              </option>
              <option value="Body Sculpting" className="text-charcoal">
                Body Sculpting
              </option>
              <option value="Medical Skincare" className="text-charcoal">
                Medical Skincare
              </option>
              <option
                value="Konsultasi Awal (Gratis)"
                className="text-charcoal"
              >
                Konsultasi Awal (Gratis)
              </option>
            </select>

            <input
              type="date"
              value={formState.date}
              onChange={handleInputChange("date")}
              placeholder="Pilih Tanggal"
              aria-label="Appointment date"
              className="w-full border-0 border-b border-gold/20 bg-transparent py-4 font-sans text-[13px] tracking-[0.05em] text-canvas outline-none transition-all duration-300 placeholder:text-canvas/20 focus:border-b-2 focus:border-gold focus:bg-gradient-to-b focus:from-gold/5 focus:to-transparent"
              required
            />

            <textarea
              rows={3}
              value={formState.notes}
              onChange={handleInputChange("notes")}
              placeholder="Catatan tambahan (opsional)"
              aria-label="Additional notes"
              className="h-20 w-full resize-none border-0 border-b border-gold/20 bg-transparent py-4 font-sans text-[13px] tracking-[0.05em] text-canvas outline-none transition-all duration-300 placeholder:text-canvas/20 focus:border-b-2 focus:border-gold focus:bg-gradient-to-b focus:from-gold/5 focus:to-transparent"
            />

            <MagneticButton
              type="submit"
              cursor="view"
              variant="outline"
              disabled={isSubmitting}
              className="mt-12 flex w-full justify-center border-gold text-gold hover:bg-gold hover:text-charcoal disabled:hover:bg-transparent disabled:hover:text-gold"
            >
              <span className="w-full">
                {isSubmitting ? "MEMPROSES..." : "KONFIRMASI RESERVASI"}
              </span>
            </MagneticButton>
          </form>
        </div>

        <div
          ref={successWrapRef}
          className="pt-10 text-center"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold">
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              aria-hidden
            >
              <path
                ref={checkPathRef}
                d="M10 21.5L18 29.5L32 13"
                stroke="#D5B97D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h4 className="font-display text-[clamp(36px,6vw,52px)] font-light italic leading-[1.05] text-canvas">
            {`Terima kasih, ${formState.name || "Sahabat JGLOW"}.`}
          </h4>
          <p className="mt-5 font-sans text-[13px] tracking-[0.08em] text-muted">
            Tim kami akan menghubungi Anda dalam 24 jam.
          </p>
        </div>
      </div>
    </div>
  );
}
