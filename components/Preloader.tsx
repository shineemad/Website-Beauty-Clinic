"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

type PreloaderProps = {
  onComplete: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const wordmark = wordmarkRef.current;
    const line = lineRef.current;

    if (!panel || !wordmark || !line) {
      return undefined;
    }

    gsap.set(wordmark, {
      opacity: 0,
      y: 12,
    });

    gsap.set(line, {
      width: 0,
    });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
      onComplete: () => {
        onComplete();
      },
    });

    timeline.to(
      wordmark,
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
      0.3,
    );

    timeline.to(
      line,
      {
        width: "60%",
        duration: 0.8,
        ease: "power2.inOut",
      },
      0.8,
    );

    timeline.to(
      panel,
      {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      },
      2.6,
    );

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-charcoal">
      <div
        ref={panelRef}
        className="absolute inset-0 flex items-center justify-center bg-charcoal px-6"
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <h1
            ref={wordmarkRef}
            className="font-display text-[40px] font-light uppercase leading-none tracking-[0.3em] text-gold md:text-[64px]"
          >
            JGLOW
          </h1>
          <div className="mx-auto h-[0.5px] bg-gold" ref={lineRef} />
        </div>
      </div>
    </div>
  );
}
