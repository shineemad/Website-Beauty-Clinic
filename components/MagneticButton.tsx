"use client";

import { useRef } from "react";

import gsap from "gsap";

type MagneticButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: "outline" | "filled";
  cursor?: "expand" | "view" | "drag" | "default";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export default function MagneticButton({
  children,
  onClick,
  className,
  variant = "outline",
  cursor = "expand",
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const isTrackingRef = useRef(false);

  const resetMagnet = (isLeave = false) => {
    const button = buttonRef.current;
    const label = labelRef.current;

    if (!button || !label) {
      return;
    }

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: isLeave ? 0.6 : 0.3,
      ease: isLeave ? "elastic.out(1, 0.4)" : "power2.out",
    });

    gsap.to(label, {
      x: 0,
      y: 0,
      duration: isLeave ? 0.45 : 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    isTrackingRef.current = true;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    const label = labelRef.current;

    if (!button || !label || !isTrackingRef.current) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > 80) {
      resetMagnet();
      return;
    }

    const buttonX = clamp(deltaX * 0.35, -18, 18);
    const buttonY = clamp(deltaY * 0.35, -10, 10);
    const labelX = clamp(deltaX * 0.2, -8, 8);
    const labelY = clamp(deltaY * 0.2, -4, 4);

    gsap.to(button, {
      x: buttonX,
      y: buttonY,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(label, {
      x: labelX,
      y: labelY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    isTrackingRef.current = false;
    resetMagnet(true);
  };

  const baseClassName =
    "relative overflow-visible rounded-none px-10 py-4 font-sans text-[13px] font-normal uppercase tracking-[0.15em] transition-all duration-[400ms] ease-out disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2";

  const variantClassName =
    variant === "filled"
      ? "border border-charcoal bg-charcoal text-canvas shadow-none hover:border-gold hover:bg-gradient-to-r hover:from-gold hover:via-gold hover:to-gold hover:text-charcoal hover:shadow-[0_8px_24px_rgba(213,185,125,0.2)]"
      : "border border-current bg-transparent text-charcoal hover:bg-charcoal/5 hover:border-gold hover:text-gold hover:shadow-[0_4px_12px_rgba(26,26,26,0.1)] active:bg-charcoal/10";

  return (
    <button
      ref={buttonRef}
      type={type}
      data-cursor={cursor}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={[baseClassName, variantClassName, className]
        .filter(Boolean)
        .join(" ")}
      aria-disabled={disabled}
    >
      <span ref={labelRef} className="inline-flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}
