'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';

type CursorMode = 'default' | 'expand' | 'view' | 'drag';

const cursorLabelByMode: Record<Exclude<CursorMode, 'default'>, string> = {
  expand: '',
  view: 'View',
  drag: 'Drag'
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label) {
      return undefined;
    }

    const gold = 'rgba(213, 185, 125, 1)';
    const goldSoft = 'rgba(213, 185, 125, 0.15)';
    const goldFill = 'rgba(213, 185, 125, 0.9)';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isPointerInside = false;
    let activeMode: CursorMode = 'default';

    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0
    });

    const applyMode = (mode: CursorMode) => {
      activeMode = mode;
      const isTextMode = mode === 'view' || mode === 'drag';
      const isExpandedMode = mode === 'expand';
      const ringSize = isTextMode || isExpandedMode ? 80 : 40;

      gsap.to(ring, {
        width: ringSize,
        height: ringSize,
        opacity: isPointerInside ? 1 : 0,
        backgroundColor: isTextMode ? goldFill : 'rgba(252, 250, 248, 0)',
        borderColor: isTextMode ? goldFill : isExpandedMode ? gold : goldSoft,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(dot, {
        opacity: isTextMode || isExpandedMode ? 0 : 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(label, {
        opacity: isTextMode ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
        text: isTextMode ? cursorLabelByMode[mode as 'view' | 'drag'] : ''
      });

      gsap.to(label, {
        color: '#1A1A1A',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      isPointerInside = true;

      const hoveredElement = (event.target as Element | null)?.closest('[data-cursor]');
      const nextMode = (hoveredElement?.getAttribute('data-cursor') as CursorMode | null) ?? 'default';

      if (nextMode !== activeMode) {
        applyMode(nextMode);
      }

      gsap.set(dot, {
        x: mouseX,
        y: mouseY,
        opacity: activeMode === 'default' ? 1 : 0
      });
    };

    const handleMouseEnter = () => {
      isPointerInside = true;
      applyMode(activeMode);
    };

    const handleMouseLeave = () => {
      isPointerInside = false;
      gsap.to([dot, ring, label], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleTicker = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      gsap.set(ring, {
        x: ringX,
        y: ringY,
        opacity: isPointerInside ? 1 : 0
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    gsap.ticker.add(handleTicker);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      gsap.ticker.remove(handleTicker);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-gold"
        style={{ width: 40, height: 40 }}
      >
        <span
          ref={labelRef}
          className="whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.15em] text-charcoal"
        />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full bg-gold"
        style={{ width: 8, height: 8 }}
      />
    </div>
  );
}